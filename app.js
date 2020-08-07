const API = "https://randomuser.me/api/?results=5";

const ShowButton = (props) => {
  return <button onClick={props.click}>Show 5 People</button>;
};

const UsersList = (props) => {
  const users = props.users.map((user) => (
    <div className="users" key={user.login.uuid}>
      <img src={user.picture.large} alt={user.login.username} />
      <h1>
        {user.name.title} {user.name.last}
      </h1>
      <p>
        <strong>{user.email}</strong>
      </p>
    </div>
  ));
  return <div className="content">{users}</div>;
};

class App extends React.Component {
  state = {
    users: [],
  };

  handleClick = () => {
    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          users: response.results,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { users } = this.state;
    return (
      <div className="wrap">
        <ShowButton click={this.handleClick} />
        {users.length ? <UsersList users={users} /> : users}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
