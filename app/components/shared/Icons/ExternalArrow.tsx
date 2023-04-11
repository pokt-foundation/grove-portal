const ExternalArrow = ({ fill }: { fill: string | undefined }) => (
  <svg
    fill="none"
    height="21"
    viewBox="0 0 20 21"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.8335 14.2144L14.1668 5.8811"
      stroke={fill}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.75"
    />
    <path
      d="M5.8335 5.8811H14.1668V14.2144"
      stroke={fill}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    />
  </svg>
)

export default ExternalArrow
