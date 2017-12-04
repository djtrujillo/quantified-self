import {getMeals} from "../requests/meals"

if (window.location.pathname == '/') {
  const onIndexLoad = $(document).ready(function() {
    getMeals()
  })
}

module.exports = {onIndexLoad}
