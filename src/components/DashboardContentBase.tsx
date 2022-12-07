function DashboardContentBase(props: any) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">{props.children}</div>
      </div>
    </div>
  );
}

export default DashboardContentBase;
