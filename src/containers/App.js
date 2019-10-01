import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import { setSearchField, requestRobots } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots()) 
	}
}

class App extends Component {
	componentDidMount () {
		this.props.onRequestRobots();
	}
	render () {
		const {searchField, onSearchChange, robots, isPending } =this.props;
		const filteredRobots = robots.filter(robot => { 
			return robot.name.toLowerCase().includes(searchField.toLowerCase()); 
			/*using the filter method, we return only those elements from the robots array whose name property,
			 converted to lowercase letters (using the toLowerCase method), includes the text we typed (also in small letters),
			  which is read from this.state.robots */
		})
		return isPending ?
			<h1>Loading</h1> :
		(
			<div className='tc'>
				<h1 className='f2'>RoboFriends</h1>
				<SearchBox searchChange={onSearchChange}/> 
				<Scroll>
					<CardList robots={filteredRobots}/> {/*children component*/}
				</Scroll>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


