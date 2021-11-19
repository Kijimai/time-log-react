class TimersDashboard extends React.Component {
  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <EditableTimerList />
          <ToggleableTimerForm isOpen={true} />
        </div>
      </div>
    )
  }
}

class EditableTimerList extends React.Component {
  render() {
    return (
      <div className="timers">
        <EditableTimer
          title="Learn React"
          project="Web Domination"
          elapsed="8985600"
          runningSince={null}
          editFormOpen={false}
        />
        <EditableTimer
          title="Make reworked portfolio website in React"
          project="Get a Job"
          elapsed="8123122"
          runningSince={null}
          editFormOpen={true}
        />
      </div>
    )
  }
}

class EditableTimer extends React.Component {
  render() {
    if (this.props.editFormOpen) {
      return <TimerForm title={this.props.title} project={this.props.project} />
    } else {
      return (
        <Timer
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
        />
      )
    }
  }
}
