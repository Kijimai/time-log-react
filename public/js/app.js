const e = require("express")

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
        runningSince: Date.now(),
      },
    ],
  }

  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <EditableTimerList timers={this.state.timers} />
          <ToggleableTimerForm isOpen={false} />
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

  render() {
    if (this.props.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
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

  handleTitleChange = () => {
    this.setState({ title: e.target.value })
  }

  handleProjectChange = () => {
    this.setState({ project: e.target.value })
  }

  render() {
    const submitText = this.props.title ? "Update" : "Create"

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
              <button className="ui basic blue button">{submitText}</button>
              <button className="ui basic red button">Cancel</button>
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

  // handleFormClose = () => {
  //   this.setState({ isOpen: false })
  // }

  render() {
    if (this.state.isOpen) {
      return <TimerForm />
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
            <span className="right floated edit icon">
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
