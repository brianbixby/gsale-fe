import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { currentGarageSaleEventFetchRequest } from "../../actions/currentGarageSaleEvent-actions";
import MapLeaflet from "../mapLeaflet";
import { renderIf } from "../../lib/util";

function GarageSaleEvent({currentGarageSaleEventFetch, currentGarageSaleEvent }) {
  const { garageSaleEventId } = useParams();
  let flag = 0;
  useEffect(() => {
    if (!flag) {
      flag++;
        currentGarageSaleEventFetch(garageSaleEventId)
        .catch((err) => console.log("garageSaleEventFetch err: ", err));
    }
  }, [flag, currentGarageSaleEventFetch, garageSaleEventId]);

  return (
    <div className="row justify-content-around">
      {renderIf(
        currentGarageSaleEvent && currentGarageSaleEvent.eventName,
        <div className="card text-center">
          <div className="card-header">Details</div>
          <div className="card-body">
            <h5 className="card-title text-muted">
              {currentGarageSaleEvent.eventName}
              {currentGarageSaleEvent.endTime}
            </h5>
            <p className="card-text">
              Just about everything must go! Electronics, Furniture,
              Kitchenware, Games, Sports Equipments, Bathroom Supplies, Clothes,
              and anything else that belongs in house that you can think of!
            </p>
            <h5 className="card-title text-muted">Address</h5>
            <p className="card-text">{currentGarageSaleEvent.address}</p>
            <h5 className="card-title text-muted">Start Date</h5>
            <p className="card-text">{currentGarageSaleEvent.startDate}</p>
            <h5 className="card-title text-muted">Time</h5>
            <p className="card-text">{currentGarageSaleEvent.startDate}</p>
            <h5 className="card-title text-muted">End Date</h5>
            <p className="card-text">{currentGarageSaleEvent.endDate}</p>
            <h5 className="card-title text-muted">Time</h5>
            <p className="card-text">{currentGarageSaleEvent.endDate}</p>
            <h5 className="card-title text-muted">Categories</h5>
            <p className="card-text">
            {currentGarageSaleEvent.categories}
            </p>
          </div>
          <div className="card-footer text-muted">Map</div>
        </div>
      )}

      <div>
        {renderIf(currentGarageSaleEvent && currentGarageSaleEvent.vendors,
            <MapLeaflet coords={currentGarageSaleEvent.vendors} />
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  currentGarageSaleEvent: state.currentGarageSaleEvent,
});

const mapDispatchToProps = (dispatch) => ({
  currentGarageSaleEventFetch: (garageSaleEventID) =>
    dispatch(currentGarageSaleEventFetchRequest(garageSaleEventID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GarageSaleEvent);
