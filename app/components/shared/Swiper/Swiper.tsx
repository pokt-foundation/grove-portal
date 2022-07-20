import React from "react"
import {
  Swiper as ExtSwiper,
  SwiperSlide,
  SwiperProps,
  SwiperSlideProps,
} from "swiper/react"
// import styles from "swiper/css"

export const links = () => {
  return [{ rel: "stylesheet", href: "https://unpkg.com/swiper@8/swiper-bundle.min.css" }]
}

type SwiperCompProps = SwiperProps & {
  slideProps?: SwiperSlideProps
}

export default function Swiper({ slideProps, ...props }: SwiperCompProps) {
  const { children } = props
  return (
    <ExtSwiper {...props}>
      {React.Children.map(children, (child) => (
        <SwiperSlide {...slideProps}>{child}</SwiperSlide>
      ))}
    </ExtSwiper>
  )
}
