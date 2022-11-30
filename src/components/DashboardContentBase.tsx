function DashboardContentBase(props: any) {
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">{props.children}</div>
        </div>
      </div>
    </section>
  );
}

export default DashboardContentBase;
