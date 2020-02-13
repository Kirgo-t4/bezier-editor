import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SVG = (props) => {
    return (
        <svg id="svg" viewBox={`0 0 ${props.size.x} ${props.size.y}`}>
            {props.children}
        </svg>
    );
}

const mapStateToProps = (state) => {
    return {
        size: state.svg.size,
    }
}

SVG.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.object.isRequired,
}


export default connect(mapStateToProps)(SVG);
