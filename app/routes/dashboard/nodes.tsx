import Card, { links as CardLinks } from "~/components/shared/Card"

export const links = () => {
  return [...CardLinks()]
}

export const Nodes = () => {
  return <Card>Node management coming soon!</Card>
}

export default Nodes

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div className="error-container">
      <h3>{error.message}</h3>
      <p>{error.stack}</p>
    </div>
  )
}
