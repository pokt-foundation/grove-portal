const Checkmark = ({ fill }: { fill: string }) => (
  <svg
    fill="none"
    height="21"
    viewBox="0 0 20 21"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.6666 5.04785L7.49998 14.2145L3.33331 10.0479"
      stroke={fill}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.75"
    />
  </svg>
)

export default Checkmark
