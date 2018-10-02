'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _react = _interopRequireDefault(require('react'))

var _propTypes = _interopRequireDefault(require('prop-types'))

var renderTime = function renderTime(time, localizer) {
  if (localizer.format(time, 'minutesOnly') === '00') {
    // '00'
    return localizer.format(time, 'hoursOnly') // '5 PM'
  }

  return localizer.format(time, 'hourAndMinutes') // '5:00 PM'
}

var getTooltipText = function getTooltipText(time, localizer) {
  return !time ? 'Drag to create an event' : renderTime(time, localizer)
}

var SelectIndicator = function SelectIndicator(props) {
  var top = props.top,
    height = props.height,
    startDate = props.startDate,
    localizer = props.localizer
  var newTopPerc = parseFloat(top) - parseFloat(height)
  return _react.default.createElement(
    'div',
    {
      className: 'pre-selection-time-indicator-parent',
      style: {
        top: newTopPerc + '%',
      },
    },
    _react.default.createElement(
      'div',
      {
        className: 'pre-selection-time-indicator-container',
      },
      _react.default.createElement(
        'div',
        {
          className: 'pre-selection-time-indicator-text',
        },
        getTooltipText(startDate, localizer)
      ),
      _react.default.createElement('div', {
        className: 'pre-selection-time-indicator-arrow',
      }),
      _react.default.createElement('div', {
        className: 'pre-selection-time-indicator-line',
      })
    )
  )
}

SelectIndicator.propTypes = {
  top: _propTypes.default.string.isRequired,
  height: _propTypes.default.string.isRequired,
  startDate: _propTypes.default.instanceOf(Date).isRequired,
  localizer: _propTypes.default.object.isRequired,
}
SelectIndicator.displayName = 'SelectIndicator'
var _default = SelectIndicator
exports.default = _default
module.exports = exports['default']
