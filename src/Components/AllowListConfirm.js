const AllowListConfirm = (props) => {
    const { listPage, setShowAllowList } = props;

    return (
        <div>
            <div className="modal-dialog1">
                <div className="modal-content">
                    <div className="modal-body">
                        <button
                            type="button"
                            className="close"
                            id="closebtn"
                            onClick={() => {setShowAllowList(false)}}
                        >
                            x
                        </button>
                        <div className="popupbox2">
                            <div className="vbfg">
                                <img src="/images/rightmark.png" />
                            </div>
                            <h2>Allowlist Approved!</h2>
                            <p>Looks like you’re on the allow list! Let’s get started </p>
                            <div className="text-center">
                                <button
                                    className=" btn"
                                    style={{
                                        textTransform: "capitalize",
                                        color: "#fff",
                                        backgroundColor: "#FFC83A",
                                        border: "2px solid #FFC83A",
                                        lineHeight: "45px",
                                    }}
                                    onClick={listPage}
                                >
                                    Base Characters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllowListConfirm;