import UiButton from "../../components/ui/UiButton"

type Props = {}

const UiButtonsPage = (props: Props) => {
  return (
    <div className="mx-4 my-2 grid grid-cols-3 gap-4">
    <UiButton size="lg" text="Large Light" color="light" />
    <UiButton size="lg" text="Large Dark" color="dark" />
    <UiButton size="lg" text="Large Success" color="success" />
    <UiButton size="lg" text="Large Warning" color="warning" />
    <UiButton size="lg" text="Large Danger" color="danger" />
    <UiButton size="sm" text="Small Light" color="light" />
    <UiButton size="sm" text="Small Dark" color="dark" />
    <UiButton size="sm" text="Small Success" color="success" />
    <UiButton size="sm" text="Small Warning" color="warning" />
    <UiButton size="sm" text="Small Danger" color="danger" />
  </div>
  )
}

export default UiButtonsPage