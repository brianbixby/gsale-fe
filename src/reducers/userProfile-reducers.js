const validateUserProfile = (userProfile) => {
  if (!userProfile.email) {
    throw new Error("VALIDATION ERROR: user profile requires an email");
  }
};

let userProfile = (state = null, action) => {
  let { type, payload } = action;

  switch (type) {
    case "SIGN_IN":
      validateUserProfile(payload.profile);
      payload.profile.category = payload.category;
      return payload.profile;
    case "USERPROFILE_UPDATE":
      if (!state) {
        throw new Error(
          "USAGE ERROR: can not update when user profile is null"
        );
      }
      return { ...state, ...payload };
    case "USERPROFILE_FETCH":
      if (!payload.vendingEvents) {
        payload.vendingEvents = [];
      }
      if (!payload.attendeeEvents) {
        payload.attendeeEvents = [];
      }
      return payload;
    case "ADD_VENDOR":
      state.vendingEvents.push(payload);
      return state;
    case "ADD_ATTENDEE":
      state.attendeeEvents.push(payload);
      return state;
    case "SIGN_OUT":
      return null;
    default:
      return state;
  }
};

export default userProfile;
