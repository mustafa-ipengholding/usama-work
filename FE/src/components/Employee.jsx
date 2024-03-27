import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import ConfirmDelModal from "./ConfirmDelModal";
import Loader from "./Loader";
import {Button, Container, Card, Col, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployee, deleteEmployee, EditEmployee } from "../action/employeeSlice";

// import  http from "http";

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [filterText, setFilterText] = useState("");
    const data = useSelector((state) => state.EmployeeData?.data?.employees);

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const Columns = ({ handleEdit, handleDelete }) => {
        const columns = [
            {
                name: <span style={{ fontWeight: "bold" }}>#</span>,
                selector: (row, index) => index + 1,
                sortable: false,
            },
            {
                name: <span style={{ fontWeight: "bold" }}>Image</span>,
                cell: (row) => (
                  <div>
                      {/*{row.image}*/}
                      <img src={row.image} alt={row.firstName} style={{width : "60px", borderRadius: "50%"}} />
                  </div>
                ),
                sortable: true,
            },
            {
                name: <span style={{ fontWeight: "bold" }}>First Name</span>,
                selector: (row) => row.firstName,
                sortable: true,
            },

            {
                name: <span style={{ fontWeight: "bold" }}>Last Name</span>,
                selector: (row) => row?.lastName,
                sortable: true,
            },
            {
                name: <span style={{ fontWeight: "bold" }}>Email</span>,
                selector: (row) => row?.email,
                sortable: true,
            },
            {
                name: <span style={{ fontWeight: "bold" }}>Phone#</span>,
                selector: (row) => row?.phone,
                sortable: true,
            },
            {
                name: <span style={{ fontWeight: "bold" }}>Department</span>,
                selector: (row) => row?.department,
                sortable: true,
            },
            {
                name: <span style={{ fontWeight: "bold" }}>Actions</span>,
                cell: (row) => (
                  <>
                      <div className="d-grid mx-2">
                          <Button as="a" variant="primary sm" onClick={() => handleEdit(row)}>
                              Update
                          </Button>
                          <Button as="a" variant="danger sm" onClick={() => handleDelete(row)}>
                              Delete
                          </Button>
                      </div>
                  </>
                ),
                allowOverflow: true,
                button: true,
            },
        ];
        return columns;
    };
    const handleEdit = (row) => {
        console.log(row);
        navigate(`/edit/${row?._id}`);
        dispatch(EditEmployee(row?._id));
    };

    const filteredItems = data;
    // Delete Function
    const handleDelete = async (row) => {
        await dispatch(deleteEmployee(row?._id));
        dispatch(fetchEmployee());
    };
    const columns = useMemo(
      () => Columns({ handleEdit, handleDelete }),
      [handleEdit, handleDelete]
    );

    useEffect(() => {
        dispatch(fetchEmployee());
    }, [dispatch]);

    return (
        <>
            {
                loading ? (
                    <div className={'vh-100 d-flex justify-content-center align-items-center'}>
                    <Loader/>
                    </div>) :
                    (<>
                        <Container>
                            <Row className="vh-90 d-flex justify-content-center align-items-center pt-12">
                                <Col md={12} lg={12} xs={12}>
                                    <div className="border border-3 border-primary"></div>
                                    <Card className="shadow">
                                        <Card.Body>
                                            <div className="mb-3 mt-2">
                                                <h2 className="fw-bold text-uppercase">Employees</h2>
                                                <Button
                                                  onClick={() => navigate("/create")}
                                                  className="registerbtn cancel"
                                                >
                                                    Add
                                                </Button>
                                                <DataTable
                                                  scrollX
                                                  columns={columns}
                                                  data={filteredItems}
                                                  pagination
                                                  paginationResetDefaultPage={resetPaginationToggle}
                                                  subHeader
                                                  persistTableHead
                                                />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </>
                    )
            }
        </>
    );
}

export default Employee;
