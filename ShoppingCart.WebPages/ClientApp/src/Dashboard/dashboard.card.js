import React from 'react';

const TopCard = (props)=>{
    return(
        <div className="col-xl-4 col-md-6 mb-4" style={{cursor:"pointer"}} onClick={props.clicked}>
                <div className={`card border-left-${props.class} shadow h-100 py-2 `}>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-green text-uppercase mb-1">{props.title}</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{props.text}</div>
                            </div>
                            <div className="col-auto text-info">
                                <i className={`fas fa-${props.icon} fa-2x text-info-300`}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default TopCard;
