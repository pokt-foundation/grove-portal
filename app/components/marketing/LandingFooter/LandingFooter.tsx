import { Link } from "@remix-run/react"
import { useTranslate } from "~/context/TranslateContext"
import styles from "./styles.css"
import Group from "~/components/shared/Group"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function LandingFooter() {
  const { t } = useTranslate()

  const navigationList = [
    {
      title: "Product",
      children: [
        {
          label: "Pocket Dashboard",
          link: "/",
        },
        {
          label: "Wallet",
          link: "/",
          external: true,
        },
        {
          label: "wPOKT",
          link: "/",
          external: true,
        },
      ],
    },
    {
      title: "About",
      children: [
        {
          label: "Company",
          link: "/",
          external: true,
        },
        {
          label: "Protocol",
          link: "/",
          external: true,
        },
        {
          label: "Foundation",
          link: "/",
          external: true,
        },
        {
          label: "DAO",
          link: "/",
          external: true,
        },
        {
          label: "Careers",
          link: "/",
          external: true,
        },
      ],
    },
    {
      title: "Learn More",
      children: [
        {
          label: "Docs",
          link: "/",
          external: true,
        },
        {
          label: "Economics",
          link: "/",
          external: true,
        },
      ],
    },
    {
      title: "Resources",
      children: [
        {
          label: "Blog",
          link: "/",
          external: true,
        },
        {
          label: "Forum",
          link: "/",
          external: true,
        },
        {
          label: "Press Kit",
          link: "/",
          external: true,
        },
      ],
    },
  ]

  return (
    <div>
      {/* <img src="/pnlogo.svg" alt="Pocket Network logo" /> */}
      <Group position="apart" align="flex-start">
        {navigationList.map((nav) => (
          <div key={nav.title}>
            <h4>{nav.title}</h4>
            <ul>
              {nav.children.map((list) => (
                <li key={list.label}>
                  {list.external ? (
                    <a href={list.link}>{list.label}</a>
                  ) : (
                    <Link to={list.link}>{list.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Group>
    </div>
  )
}
