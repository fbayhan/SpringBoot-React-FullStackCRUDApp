import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            firstNNmae: '',
            lastName: '',
            emailId: ''
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        //        this.changeEMailHandler = this.changeEMailHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    componentDidMount() {
        if (this.state.id == -1) {
            return
        }
        else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    firstNNmae: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId
                })


            });
        }

    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        let employee = {
            firstName: this.state.firstNNmae,
            lastName: this.state.lastName,
            emailId: this.state.emailId
        }
        console.log(employee);
        console.log("employee => " + JSON.stringify(employee));

        if (this.state.id == -1) {
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push('/employees')
            }
            );
        }
        else {
            EmployeeService.updateEmployee(employee, this.state.id).then(
                res => {
                    this.props.history.push('/employees');
                }
            )

        }
    }
    cancel() {
        this.props.history.push('/employees');
    }

    changeFirstNameHandler = (event) => {
        this.setState({ firstNNmae: event.target.value })
    }
    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value })
    }

    changeEMailHandler = (event) => {
        this.setState({ emailId: event.target.value })
    }


    getTitle() {
        if (this.state.id == -1) {
            return <h3 className="text-center"> Add Employee</h3>

        } else {
            return <h3 className="text-center"> Update Employee</h3>

        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name : </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.firstNNmae} onChange={this.changeFirstNameHandler}>
                                        </input>
                                    </div>

                                    <div className="form-group">
                                        <label>Last Name : </label>
                                        <input placeholder="First Name" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler}
                                        ></input>
                                    </div>


                                    <div className="form-group">
                                        <label>Email Address : </label>
                                        <input placeholder="Email Address" name="emailName" className="form-control"
                                            value={this.state.emailId} onChange={this.changeEMailHandler}
                                        ></input>

                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee} >Save</button>
                                    <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={this.cancel.bind(this)} >Cancel</button>

                                </form>

                            </div>
                        </div>

                    </div>



                </div>
            </div>
        );
    }
}
export default CreateEmployeeComponent