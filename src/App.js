import React, { Component } from "react";
import "./App.css";

import Result from "./result";
import Move from "./move";

function dateSorter(entry1, entry2) {
  return entry1.startDate > entry2.startDate ? 1 : -1;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      birthDate: null,
      editingId: 0,
      entries: [{ id: 0 }]
    };

    this.handleCommit = this.handleCommit.bind(this);
    this.addOne = this.addOne.bind(this);
  }

  addOne(countryCode, startDate) {
    const entries = this.state.entries.slice();
    const editingId = Math.round(Math.random() * 1000000);

    entries.push({ id: editingId });

    this.setState({
      editingId,
      entries
    });
  }

  handleCommit(id, newState) {
    const entries = this.state.entries.slice();
    const entryIdx = entries.findIndex(entry => entry.id === id);

    entries[entryIdx] = { id, ...newState };
    entries.sort(dateSorter);

    this.setState({
      editingId: null,
      entries
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.entries.map(entry => (
          <React.Fragment key={entry.id}>
            <Move
              editing={this.state.editingId === entry.id}
              handleCommit={this.handleCommit}
              handleDelete={this.handleDelete}
              handleSetEditing={editingId => this.setState({ editingId })}
              {...entry}
            />
          </React.Fragment>
        ))}
        {this.state.editingId === null && (
          <button onClick={this.addOne}>Add</button>
        )}
        <Result sortedEntries={this.state.entries} />
      </div>
    );
  }
}

export default App;
