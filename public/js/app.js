class TimersDashboard extends React.Component {
  state = {
    timers: [
      {
        title: "Learn React",
        project: "Web Dominations",
        id: uuid.v4(),
        elapsed: 5452000,
        runningSince: Date.now(),
      },
      {
        title: "Make Beef Curry",
        project: "GOTTA EAT!",
        id: uuid.v4(),
        elapsed: 54100,
        runningSince: null,
      },
    ],
  }

  handleCreateFormSubmit = (timer) => {
    this.createTimer(timer)
  }

  createTimer = (timer) => {
    const t = helpers.newTimer(timer)

    this.setState({
      timers: this.state.timers.concat(t),
    })
  }

  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <EditableTimerList timers={this.state.timers} />
          <ToggleableTimerForm
            onFormSubmit={this.handleCreateFormSubmit}
            isOpen={false}
          />
        </div>
      </div>
    )
  }
}

class EditableTimerList extends React.Component {
  render() {
    const timers = this.props.timers.map((timer) => {
      return (
        <EditableTimer
          key={timer.id}
          id={timer.id}
          title={timer.title}
          project={timer.project}
          elapsed={timer.elapsed}
          runningSince={timer.runningSince}
          onFormSubmit={this.props.onFormSubmit}
        />
      )
    })

    return <div className="timers">{timers}</div>
  }
}

class EditableTimer extends React.Component {
  state = {
    editFormOpen: false,
  }

  handleEditClick = () => {
    this.openForm()
  }

  handleFormClose = () => {
    this.closeForm()
  }

  handleSubmit = (timer) => {
    this.props.onFormSubmit(timer)
    this.closeForm()
  }

  openForm = () => {
    this.setState({ editFormOpen: true })
  }

  closeForm = () => {
    this.setState({ editFormOpen: false })
  }

  render() {
    if (this.props.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      )
    } else {
      return (
        <Timer
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
          onEditClick={this.handleEditClick}
        />
      )
    }
  }
}

class TimerForm extends React.Component {
  state = {
    title: this.props.title || "",
    project: this.props.project || "",
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  handleProjectChange = (e) => {
    this.setState({ project: e.target.value })
  }

  handleSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.state.title,
      project: this.state.project,
    })
  }

  render() {
    const submitText = this.props.id ? "Update" : "Create"

    return (
      <div className="ui centered card">
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="project">Project</label>
              <input
                id="project"
                type="text"
                value={this.state.project}
                onChange={this.handleProjectChange}
              />
            </div>
            <div className="ui two bottom attached buttons">
              <button
                onClick={this.handleSubmit}
                className="ui basic blue button"
              >
                {submitText}
              </button>
              <button
                onClick={this.props.onFormClose}
                className="ui basic red button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ToggleableTimerForm extends React.Component {
  state = {
    isOpen: false,
  }

  handleFormOpen = () => {
    this.setState({ isOpen: true })
  }

  handleFormSubmit = (timer) => {
    this.props.onFormSubmit(timer)
    this.setState({ isOpen: false })
  }

  handleFormClose = () => {
    this.setState({ isOpen: false })
  }

  render() {
    if (this.state.isOpen) {
      return (
        <TimerForm
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      )
    } else {
      return (
        <div className="ui basic content center aligned segment">
          <button
            onClick={this.handleFormOpen}
            className="ui basic button icon"
          >
            <i className="plus icon" />
          </button>
        </div>
      )
    }
  }
}

class Timer extends React.Component {
  render() {
    const elapsedString = helpers.renderElapsedString(this.props.elapsed)
    console.log(elapsedString)

    return (
      <div className="ui centered card">
        <div className="content">
          <div className="header">{this.props.title}</div>
          <div className="meta">{this.props.project}</div>
          <div className="center aligned description">
            <h2>{elapsedString}</h2>
          </div>
          <div className="extra content">
            <span
              onClick={this.props.onEditClick}
              className="right floated edit icon"
            >
              <i className="edit icon" />
            </span>
            <span className="right floated trash icon">
              <i className="trash icon" />
            </span>
          </div>
        </div>
        <div className="ui bottom attached blue basic button">Start</div>
      </div>
    )
  }
}

ReactDOM.render(<TimersDashboard />, document.getElementById("content"))
