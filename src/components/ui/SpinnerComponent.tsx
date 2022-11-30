import cssStyles from "./SpinnerComponent.module.css";
export default function SpinnerComponent() {
  return (
    <div className={cssStyles["spinner-wrapper"]}>
      <div className={cssStyles["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
