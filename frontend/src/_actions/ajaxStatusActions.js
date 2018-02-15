import * as types from './actionTypes';

export function ajaxCallError(errors, event) {
  return {
    type: types.AJAX_CALL_ERROR,
    payload: {
      [event || 'default']: errors,
    }
  };
}
