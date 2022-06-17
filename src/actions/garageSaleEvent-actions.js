import superagent from "superagent";

import {
  dateFilterHelper,
  locationFilterHelper,
  categoryFilterHelper,
} from "../lib/util";
import { unfilteredGarageSaleEventsFetch } from "./unfilteredGarageSaleEvent-actions";

export const garageSaleEventsFilter = (garageSaleEvent) => ({
  type: "GARAGE_SALE_EVENTS_FILTER",
  payload: garageSaleEvent,
});

export const garageSaleEventsFetch = (garageSaleEvents) => ({
  type: "GARAGE_SALE_EVENTS_FETCH",
  payload: garageSaleEvents,
});

export const filterGarageSaleEvents = (data, filterObject) => (dispatch) => {
  console.log("filterGarageSaleEvents: ", filterObject);
  data = dateFilterHelper(data, filterObject);
  data = locationFilterHelper(data, filterObject);
  data = categoryFilterHelper(data, filterObject);
  dispatch(garageSaleEventsFilter({ gse: data, filter: filterObject }));
};

// eslint-disable-next-line
export const garageSaleEventsFilterRequest = (filterObject) => (dispatch) => {
  return superagent
    .get(`http://localhost:3001/api/garageSaleEvents`)
    .then((res) => {
      let data = dateFilterHelper(res.body, filterObject);
      data = locationFilterHelper(data, filterObject);
      data = categoryFilterHelper(data, filterObject);
      dispatch(unfilteredGarageSaleEventsFetch(res.body));
      dispatch(garageSaleEventsFilter({ gse: data, filter: filterObject }));
      return res.body;
    })
    .catch((err) => {
      console.log("garageSaleEventsFilterRequest Error: ", err);
      return err;
    });
};

export const garageSaleEventsFetchRequest = () => (dispatch) => {
  return superagent
    .get(`http://localhost:3001/api/garageSaleEvents`)
    .then((res) => {
      dispatch(garageSaleEventsFetch(res.body));
      return res.body;
    })
    .catch((err) => {
      console.log("garageSaleEventsFetchRequest Error: ", err);
      return err;
    });
};
