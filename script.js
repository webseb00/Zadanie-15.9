class App extends React.Component {
	constructor() {
		super();
		this.state = {
			searchText: '',
			users: []
		};
	}

	onChangeHandle(event) {
		this.setState(
			{searchText: event.target.value}
		)
	}

	onSubmit(event) {
	    event.preventDefault();
	    const {searchText} = this.state;
	    const url = `https://api.github.com/search/users?q=${searchText}`;
	    fetch(url)
	      .then(response => response.json())
	      .then(responseJson => this.setState({users: responseJson.items}));
    }

	render() {
		const { searchText, users } = this.state;
		return (
			<div className="wrapper">
				<form className="form-app" onSubmit={event => this.onSubmit(event)}>
					<label htmlFor="searchText">Search by user name</label>
					<input 
					type="text"
					id="searchText"
					onChange={event => this.onChangeHandle(event)}
					value={searchText} 
          			placeholder="Type name of the user" />
				</form>
				<UsersList users={users}/>
			</div>
		)
	}
}

class UsersList extends React.Component {
	get users() {
		return this.props.users.map(user => <User key={user.id} user={user} />);
	}

	render() {
		return (
			<div className="container">
				{this.users}
			</div>
		)
	}
}

class User extends React.Component {
	render() {
		const { avatar_url, html_url, login } = this.props;
		return (
			<div className="user-box">
				<img src={avatar_url} style={{maxWidth: '100px'}}/>
				<a href={html_url} target="_blank">{login}</a>
			</div>
		)
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('root')
);