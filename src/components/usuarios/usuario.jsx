import '../../assets/css/profile.css';



export default function Usuario({usuario}) {
    
    return (
        <>
            <div className="container-fluid py-5 h-100 d-flex flex-column vh-100 chat-div">
                <div className="row justify-content-center align-items-center">
                <div className="col col-lg-12 mb-12 mb-lg-12 col-sm-12 mb-sm-12">
                    <div id="card-perfil" className="card mb-2 w-100 flex-grow-1">
                    <div className="row w-100">
                                <div id="perfil" className="col-md-4 col-sm-12 gradient-custom text-center">
                                    <img id="img-perfil" src={usuario.imagen}
                                        alt={usuario.imagen} className="img-fluid my-5" />
                                    <h4 id="usuario-correo">{usuario.correo}</h4>
                                    <p id="usuario-nombre" className="mb-3" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{usuario.nombre}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
