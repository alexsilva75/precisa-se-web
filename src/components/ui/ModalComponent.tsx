const ModalComponent = (props: any) => {
  return (
    <div className="modal fade" tabIndex={-1} role="dialog" id="exampleModal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
