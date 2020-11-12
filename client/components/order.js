import React from 'react';
import {connect} from 'react-redux';

class Order extends React.Component{


  render() {
    return (
      <div className='order'>
        <h1>Your Orders</h1>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(Order)
