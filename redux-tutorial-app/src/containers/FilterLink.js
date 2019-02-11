import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions/index'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
  return {
    // 表示中のfilterと（todo）自身のfilterは同じか
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // 自身のfilterを変更
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink