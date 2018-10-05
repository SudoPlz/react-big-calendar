'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireWildcard(require('react'))

var TimeSlotUtils = _interopRequireWildcard(require('./utils/TimeSlots'))

var _dates = _interopRequireDefault(require('./utils/dates'))

var TimeIndicatorLine =
  /*#__PURE__*/
  (function(_Component) {
    ;(0, _inheritsLoose2.default)(TimeIndicatorLine, _Component)

    function TimeIndicatorLine() {
      var _this

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key]
      }

      _this = _Component.call.apply(_Component, [this].concat(args)) || this
      var _this$props = _this.props,
        timeslots = _this$props.timeslots,
        step = _this$props.step

      var _this$calculateMinMax = _this.calculateMinMaxNow(_this.props),
        min = _this$calculateMinMax.min,
        max = _this$calculateMinMax.max,
        now = _this$calculateMinMax.now

      _this.slotMetrics = TimeSlotUtils.getSlotMetrics({
        min: min,
        max: max,
        timeslots: timeslots,
        step: step,
      })
      _this.state = {
        min: min,
        max: max,
        now: now,
      }
      return _this
    }

    var _proto = TimeIndicatorLine.prototype

    _proto.componentDidMount = function componentDidMount() {
      // set an interval (per minute)
      this.minuteTracker = window.setInterval(
        this.onMinuteChange.bind(this),
        60000
      )
    }

    _proto.componentWillReceiveProps = function componentWillReceiveProps(
      nextProps
    ) {
      this.updateSlotMetrics(nextProps, this.state)
    }

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (this.minuteTracker) {
        window.clearInterval(this.minuteTracker)
        this.minuteTracker = null
      }
    }

    _proto.onMinuteChange = function onMinuteChange() {
      var newState = this.calculateMinMaxNow(this.props)
      this.updateSlotMetrics(this.props, newState) // every minute

      this.setState(newState) // update the min max values
    }

    _proto.getTimeIndicatorPosition = function getTimeIndicatorPosition() {
      var _this$state = this.state,
        min = _this$state.min,
        max = _this$state.max,
        now = _this$state.now
      var totalHeight = this.props.totalHeight

      if (now >= min && now <= max) {
        var _this$slotMetrics$get = this.slotMetrics.getRange(now, now),
          topPercentage = _this$slotMetrics$get.top

        return (parseFloat(topPercentage) / 100) * totalHeight
      }

      return null
    }

    _proto.updateSlotMetrics = function updateSlotMetrics(propsToUse, _ref) {
      var min = _ref.min,
        max = _ref.max
      var timeslots = propsToUse.timeslots,
        step = propsToUse.step
      this.slotMetrics = this.slotMetrics.update({
        min: min,
        max: max,
        timeslots: timeslots,
        step: step,
      })
    }

    _proto.calculateMinMaxNow = function calculateMinMaxNow(propsToUse) {
      if (propsToUse === void 0) {
        propsToUse = this.props
      }

      var now = propsToUse.getNow ? propsToUse.getNow() : new Date()
      return {
        now: now,
        min: _dates.default.startOf(now, 'day'),
        max: _dates.default.endOf(now, 'day'),
      }
    }

    _proto.render = function render() {
      // const {  components } = this.props
      var now = this.state.now

      if (now) {
        var top = this.getTimeIndicatorPosition()

        if (top) {
          return _react.default.createElement('div', {
            className: 'rbc-current-time-indicator',
            style: {
              top: top,
            },
          })
        }
      }

      return null
    }

    return TimeIndicatorLine
  })(_react.Component)

exports.default = TimeIndicatorLine
TimeIndicatorLine.propTypes = {
  timeslots: _propTypes.default.number.isRequired,
  totalHeight: _propTypes.default.number,
  step: _propTypes.default.number.isRequired,
  getNow: _propTypes.default.func.isRequired,
  components: _propTypes.default.object.isRequired,
  localizer: _propTypes.default.object.isRequired,
  resource: _propTypes.default.string,
}
TimeIndicatorLine.defaultProps = {
  totalHeight: 1320,
}
module.exports = exports['default']
