/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Button,
    Checkbox,
    Label,
    Modal,
    Select,
    Table,
    TextInput,
    Textarea,
    Progress,
    Badge
  } from "flowbite-react";
  import Datepicker from "tailwind-datepicker-react"
  import type { FC } from "react";
  import { useEffect, useState, SetStateAction, useRef } from "react"
  import {
    // HiChevronLeft,
    // HiChevronRight,
    HiRefresh,
    HiDocumentDownload,
    // HiOutlinePencilAlt,
    HiPlus,
    HiOutlinePencilAlt,
    HiEye,
  } from "react-icons/hi";
  import { FaCheck, FaTimes } from "react-icons/fa"
  import NavbarSidebarLayout2 from "../../layouts/navbar-sidebar2";
  import axios from "axios";
  import { FiletypeCsv, FiletypeXlsx } from 'react-bootstrap-icons';
  import { BiSave } from "react-icons/bi";
  
  import CryptoJS from "crypto-js";
  
  import * as XLSX from 'xlsx';
  
  const created_user3 = localStorage.getItem("badgeSession") || "";
  const created_user2 = (created_user3 ? CryptoJS.AES.decrypt(created_user3, "Tyrannosaurus") : "");
  const created_user = (created_user2 ? created_user2.toString(CryptoJS.enc.Utf8) : "");
  
  
  const Vendors: FC = function () {
    const [data, setData] = useState([] as any[]);
    let [filteredResults, setFilteredResults] = useState([] as any[]);
    let [sortByName, setSortByName] = useState(false);
    let [sortbyPosition, setSortByPosition] = useState(false);
    let [sortByDepartment, setSortByDeparment] = useState(false);
    let [sortByStatus, setSortByStatus] = useState(false);
    let [dataTemp, setDataTemp] = useState([] as any[]);
    let checkboxRef = useRef<HTMLInputElement>(null);
    const [checkBoxes, setCheckBoxes] = useState(false);
    const checkboxArray: string[] = [];
    const [sharedState, setSharedState] = useState(false);
  
    const updateSharedState = (newValue: boolean) => {
      resetCheckboxes();
      setSharedState(newValue);
    }
  
    useEffect(() => {
      axios.get('https://bn.glassmountainbpo.com:8080/giftCards/vendors')
        .then(res => setData(res.data))
    }, [sharedState])
  
    const [searchInput, setSearchInput] = useState('');
    const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
      setSearchInput(e.target.value);
    };
  
    function goodDisplay(dateString: string): string {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      }).format(date);
    }
  
    useEffect(() => {
      if (searchInput !== '') {
        const foo = data;
        let filteredRawData = foo.filter((user) => {
          return Object.values(user).join('').toLowerCase().includes(searchInput.toLowerCase());
        })
        if (sortByName === true) {
          filteredRawData = filteredRawData.sort((a, b) => (a.taskName.toLowerCase() > b.taskName.toLowerCase()) ? 1 : -1);
        }
        if (sortbyPosition === true) {
          filteredRawData = filteredRawData.sort((a, b) => (a.status > b.status) ? 1 : -1);
        }
        if (sortByDepartment === true) {
          filteredRawData = filteredRawData.sort((a, b) => (a.department > b.department) ? 1 : -1);
        }
        if (sortByStatus === true) {
          filteredRawData = filteredRawData.sort((a, b) => (a.value > b.value) ? 1 : -1);
        }
        setFilteredResults(filteredRawData);
        resetCheckboxes();
      } else {
        let foo = data;
        if (sortByName === true) {
          foo = foo.sort((a, b) => (a.taskName.toLowerCase() > b.taskName.toLowerCase()) ? 1 : -1);
        }
        if (sortbyPosition === true) {
          foo = foo.sort((a, b) => (a.status > b.status) ? 1 : -1);
        }
        if (sortByDepartment === true) {
          foo = foo.sort((a, b) => (a.department > b.department) ? 1 : -1);
        }
        if (sortByStatus === true) {
          foo = foo.sort((a, b) => (a.value > b.value) ? 1 : -1);
        }
        setDataTemp(foo);
      }
    }, [searchInput, sortByName, sortbyPosition, sortByDepartment, sortByStatus, dataTemp, data]);
  
    const handleSortClick = (e: any, header: string) => {
      resetCheckboxes();
      if (e) {
        if (header === "name") {
          if (sortByName === false) {
            setSortByPosition(false);
            setSortByDeparment(false);
            setSortByStatus(false);
            setSortByName(true);
          } else {
            setSortByName(false);
          }
        }
        if (header === "position") {
          if (sortbyPosition === false) {
            setSortByName(false);
            setSortByDeparment(false);
            setSortByStatus(false);
            setSortByPosition(true);
          } else {
            setSortByPosition(false);
          }
        }
        if (header === "department") {
          if (sortByDepartment === false) {
            setSortByName(false);
            setSortByPosition(false);
            setSortByStatus(false);
            setSortByDeparment(true);
          } else {
            setSortByDeparment(false);
            resetCheckboxes();
          }
        }
        if (header === "state") {
          if (sortByStatus === false) {
            setSortByName(false);
            setSortByPosition(false);
            setSortByDeparment(false);
            setSortByStatus(true);
          } else {
            setSortByStatus(false);
            resetCheckboxes();
          }
        }
      }
    }
  
    //Prevent user from using the Enter key when using the search/filter bar
    const handleKeyDown = (e: any) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    }
  
    // Function to handle "Select All" button click
    const handleSelectAll = () => {
      console.log(data)
      console.log(currentItems)
      checkboxRef.current!.checked ? setCheckBoxes(true) : setCheckBoxes(false)
    };
  
    useEffect(() => {
      const userCheckboxes = document.getElementsByName('usersCheckbox') as NodeListOf<HTMLInputElement>;
  
      for (let i = 0; i < userCheckboxes.length; i++) {
        const checkbox = userCheckboxes[i];
        if (checkbox) {
          checkbox.checked = checkBoxes;
        }
      }
  
      if (checkBoxes === false) {
        checkboxArray.splice(0);
      } else {
        for (let i = 0; i < userCheckboxes.length; i++) {
          const checkbox = userCheckboxes[i];
          if (checkbox) {
            checkboxArray.push(checkbox.value);
  
          };
        };
      };
    }, [checkBoxes])

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Assuming data is your dataset
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = (searchInput.length > 1 ? filteredResults : (dataTemp.length === 0 ? data : (sortByName === true || sortbyPosition === true || sortByDepartment === true ? dataTemp : data))).slice(indexOfFirstItem, indexOfLastItem);
    const dataLength = (searchInput.length > 1 ? filteredResults : (dataTemp.length === 0 ? data : (sortByName === true || sortbyPosition === true || sortByDepartment === true ? dataTemp : data))).length

    const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

    const updateCheckboxArray = (badge: string) => {
      const checkbox = document.getElementById('checkbox-' + badge) as HTMLInputElement;
      if (checkbox.checked) {
        checkboxArray.push(badge);
      } else {
        const indexToRemove = checkboxArray.indexOf(badge);
        checkboxArray.splice(indexToRemove, 1);
      };
    };
  
    const resetCheckboxes = () => {
      setCheckBoxes(false);
      checkboxArray.splice(0);
      checkboxRef.current!.checked = false;
      const userCheckboxes = document.getElementsByName('usersCheckbox') as NodeListOf<HTMLInputElement>;
  
      for (let i = 0; i < userCheckboxes.length; i++) {
        const checkbox = userCheckboxes[i];
        if (checkbox) {
          checkbox.checked = false;
        };
      };
    };
  
    const formatDate = (dateString: string): string => {
      const dateObject: Date = new Date(dateString);
  
      return dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    };
  
    const options = {
      title: "Demo Title",
      autoHide: true,
      todayBtn: false,
      clearBtn: true,
      clearBtnText: "Clear",
      maxDate: new Date("2030-01-01"),
      minDate: new Date("1950-01-01"),
      theme: {
        background: "bg-gray-700 dark:bg-gray-800",
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        disabledText: "bg-red-500",
        input: "",
        inputIcon: "",
        selected: "",
      },
      icons: {
        // () => ReactElement | JSX.Element
        prev: () => <span>Previous</span>,
        next: () => <span>Next</span>,
      },
      datepickerClassNames: "top-12",
      defaultDate: new Date("2022-01-01"),
      language: "en",
      disabledDates: [],
      weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      inputNameProp: "date",
      inputIdProp: "date",
      inputPlaceholderProp: "Select Date",
      inputDateFormatProp: {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    };
  
    return (
      <NavbarSidebarLayout2 isFooter={true}>
        <div className="block items-center justify-between border-b rounded-tl-2xl rounded-tr-2xl border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
          <div className="mb-1 w-full">
            <div className="mb-4">
              <h1 style={{ zoom: 0.90 }} className="text-xl ml-4 mt-4 font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Vendors
              </h1>
            </div>
            <div className="sm:flex" style={{ zoom: 0.90 }}>
              <div className="mb-3 ml-4 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
                <form className="lg:pr-3">
                  <Label htmlFor="users-search" className="sr-only">
                    Search
                  </Label>
                  <div className="relative mt-1 lg:w-64 xl:w-96">
                    <TextInput
                      id="users-search"
                      name="users-search"
                      placeholder="Search for vendor"
                      onChange={onChange}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </form>
                <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                  <a
                    href=""
                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Refresh</span>
                    <HiRefresh className="text-2xl" />
                  </a>
                  {created_user === "3199" || created_user === "3814" ?
                    <DeleteUsersModal
                      users={checkboxArray}
                      created_user={created_user}
                      sharedState={sharedState}
                      updateSharedState={updateSharedState} /> : <></>}
                  {created_user === "3199" || created_user === "3814" ?
                    <ActivateUsersModal
                      users={checkboxArray}
                      created_user={created_user}
                      sharedState={sharedState}
                      updateSharedState={updateSharedState} /> : <></>}
                </div>
              </div>
              {created_user === "3199" || created_user === "3814" ?
                <div className="ml-auto mr-4 flex items-center space-x-2 sm:space-x-3">
                  <AddTaskModal
                    sharedState={sharedState}
                    updateSharedState={updateSharedState} />
                  <ExportModal
                    data={data} />
                </div>
                : <></>}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow">
                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600" style={{ zoom: 0.85 }}>
                  <Table.Head className="bg-gray-100 dark:bg-gray-700">
                    <Table.HeadCell>
                      <Label htmlFor="select-all" className="sr-only">
                        Select all
                      </Label>
                      <Checkbox id="select-all" name="select-all" ref={checkboxRef} onChange={handleSelectAll} />
                    </Table.HeadCell>
                    <Table.HeadCell className="hover:cursor-pointer hover:text-blue-500" onClick={(e) => handleSortClick(e, "name")} >ID</Table.HeadCell>
                    <Table.HeadCell className="hover:cursor-pointer hover:text-blue-500" onClick={(e) => handleSortClick(e, "position")} >Name</Table.HeadCell>
                    <Table.HeadCell className="hover:cursor-pointer hover:text-blue-500" onClick={(e) => handleSortClick(e, "department")}>Creation Date</Table.HeadCell>
                    <Table.HeadCell className="hover:cursor-pointer hover:text-blue-500">Status</Table.HeadCell>
                    {/* {created_user === "3199" || created_user === "3814" ? */}
                    <Table.HeadCell>Actions</Table.HeadCell>
                    {/* : <></>} */}
                  </Table.Head>
                  <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {
                        currentItems.map((user, index) => (
                          <Table.Row key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Table.Cell className="w-4">
                              <div className="flex items-center">
                                <Checkbox id={"checkbox-" + user.id} value={user.id} name="usersCheckbox" onChange={() => updateCheckboxArray(user.id)} />
                                <label htmlFor={"checkbox-" + user.id} className="sr-only">
                                </label>
                              </div>
                            </Table.Cell>
                            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
                              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                <div id={"taskName" + user.id} className="text-base font-semibold text-gray-900 dark:text-white">
                                  {user.id}
                                </div>
                                <div className="text-sm whitespace-pre-wrap font-normal text-gray-500 dark:text-gray-400">
                                  {/* {user.account} */}
                                  Vendor
                                </div>
                              </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                              <span className=" text-primary-800 font-bold px-2 py-0.5 rounded dark:text-white">
                                {user.name}
                              </span>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                              <span>
                                {goodDisplay(user.creationDate)}
                              </span>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                              {(user.active == 1) ?
                              <span className="bg-green-600 text-green-200 font-semibold px-2 py-0.5 rounded dark:bg-green-700 dark:text-green-200">
                                Active
                              </span> :
                              <span className="bg-yellow-600 text-yellow-200 font-semibold px-2 py-0.5 rounded dark:bg-yellow-700 dark:text-yellow-200">
                                Inactive
                              </span>}
                            </Table.Cell>
                            {created_user === "3199" || created_user === "3814" ? (
                              <Table.Cell>
                                <div className="flex items-center gap-x-3 whitespace-nowrap">
                                  <EditUserModal
                                    taskID={user.taskID}
                                    taskName2={user.taskName}
                                    status2={user.status}
                                    state2={user.state}
                                    department2={user.department}
                                    description2={user.description}
                                    value2={user.value}
                                    owner2={user.owner}
                                    requester2={user.requester}
                                    sharedState={sharedState}
                                    updateSharedState={updateSharedState}
                                  />
                                  <DeleteUserModal
                                    vendorID={user.id}
                                    active={user.active}
                                    created_user={created_user}
                                    sharedState={sharedState}
                                    updateSharedState={updateSharedState}
                                  />
                                </div>
                              </Table.Cell>
                            ) : (
                              <Table.Cell>
                                <div className="flex items-center gap-x-3 whitespace-nowrap">
                                </div>
                              </Table.Cell>
                            )}
                          </Table.Row>
                        ))
                    }
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </div>
        <Pagination itemsPerPage={itemsPerPage} totalItems={dataLength} paginate={paginate} />
        {/* <Pagination /> */}
      </NavbarSidebarLayout2>
    );
  };

  const Pagination = ({ itemsPerPage, totalItems, paginate }: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    const indexOfLastPage = currentPage + 2;
    const indexOfFirstPage = indexOfLastPage - 4;
    const currentPages = pageNumbers.slice(Math.max(indexOfFirstPage, 0), Math.min(indexOfLastPage, totalPages));
  
    const paginateHandler = (pageNumber: number) => {
      setCurrentPage(pageNumber);
      paginate(pageNumber);
    };
  
    const nextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(prev => prev + 1);
        paginate(currentPage + 1);
      }
    };
  
    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(prev => prev - 1);
        paginate(currentPage - 1);
      }
    };
  
    return (
      <nav aria-label="Page navigation example">
        <ul className="flex items-center justify-center -space-x-px mt-3 h-8 text-sm">
          <li>
            <a onClick={prevPage} href="#!" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Previous</span>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
              </svg>
            </a>
          </li>
          {currentPages.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'bg-gray-100 dark:bg-gray-600' : 'text-gray-500 bg-white border-gray-300'}`}>
              <a onClick={() => paginateHandler(number)} href="#!" className="flex items-center justify-center px-3 h-8 leading-tight hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                {number}
              </a>
            </li>
          ))}
          <li>
            <a onClick={nextPage} href="#!" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Next</span>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    );
  };  
  
  const AddTaskModal: FC<any> = function ({ sharedState, updateSharedState }: any) {
    const [isOpen, setOpen] = useState(false);
    const [vendorName, setVendorName] = useState('');
  
    const resetFields = () => {
      setVendorName('');
    };
  
    const url2 = `https://bn.glassmountainbpo.com:8080/giftCards/addVendor`;
    const handleSubmit = async (e: React.FormEvent) => {
      if (!vendorName) {
        alert('Enter a Vendor Name!')
      } else {
        e.preventDefault()
        try {
          const response = await axios.post(url2, {
            vendorName
        })
        if (response.status == 200) {
          const responseData = response.data;
          updateSharedState(!sharedState);
  
          if (responseData.message === "Vendor created"){
            setOpen(false);
            resetFields();
            alert('Vendor registered successfully!')
          } else {
            console.log("Fatal Error");
          }
        }
      } catch (error) {
        console.log(error);
        setOpen(false)
      }
    }
  }
  
    return (
      <>
        <Button color="primary" onClick={() => { setOpen(true) }}>
          <div className="flex items-center gap-x-3">
            <HiPlus className="text-xl" />
            Add Vendor
          </div>
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Add a new Vendor</strong>
          </Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="col-span-2">
                <Label className="" htmlFor="vendorName">Vendor's Name</Label>
                <div className="mt-1">
                  <TextInput
                    id="vendorName"
                    name="vendorName"
                    placeholder="Super Selectos"
                    value={vendorName}
                    onChange={e => {
                      setVendorName(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              color="primary"
              onClick={(e) => { handleSubmit(e) }}>
              Add vendor
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  
  const EditUserModal: FC<any> = function ({ taskID, taskName2, status2, state2, department2, description2, value2, owner2, requester2, sharedState, updateSharedState }: any) {
    const [isOpen, setOpen] = useState(false);
    const [taskName, setTaskName] = useState(taskName2)
    const [status, setStatus] = useState(status2)
    const [state, setState] = useState(state2)
    const [department, setDepartment] = useState(department2)
    const [description, setDescription] = useState(description2)
    const [value, setValue] = useState(value2)
    const [owner, setOwner] = useState(owner2)
    const [requester, setRequester] = useState(requester2)
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        const response = await axios.post('https://bn.glassmountainbpo.com:8080/dev/editTask', {
          taskID,
          taskName,
          status,
          state,
          department,
          description,
          value,
          owner,
          requester,
          created_user
        })
        if (response.status == 200) {
          const responseData = response.data;
          updateSharedState(!sharedState);
          setOpen(false);
          if (responseData.message === "Task updated successfully") {
            setOpen(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      created_user === "3199" || created_user === "3814" ?
        <>
          <Button className="text-white bg-green-400 dark:bg-green-400 dark:enabled:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => setOpen(true)}>
            <div className="flex items-center gap-x-2">
              <HiOutlinePencilAlt className="text-lg" />
  
            </div>
          </Button>
          <Modal onClose={() => setOpen(false)} show={isOpen}>
            <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
              <strong>Edit Task</strong>
            </Modal.Header>
            <Modal.Body>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <Label htmlFor="taskID">Task ID</Label>
                  <div className="mt-1">
                    <TextInput
                      id="taskID"
                      name="taskID"
                      value={taskID}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="taskName">Task Name</Label>
                  <div className="mt-1">
                    <TextInput
                      value={taskName}
                      onChange={e => { setTaskName(e.target.value) }}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <div className="mt-1">
                    <Select
                      id="status"
                      name="status"
                      value={status}
                      onChange={e => { setStatus(e.target.value) }}
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">On Hold</option>
                      <option value="On Hold">Other</option>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <div className="mt-1">
                    <Select
                      id="state"
                      name="state"
                      value={state}
                      onChange={e => { setState(e.target.value) }}
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <div className="mt-1">
                    <Select
                      id="department"
                      name="department"
                      value={department}
                      onChange={e => { setDepartment(e.target.value) }}
                    >
                      <option value="IT">IT</option>
                      <option value="Finance">Finance</option>
                      <option value="Recruitment">Recruitment</option>
                      <option value="HHRR">HHRR</option>
                      <option value="Security">Security</option>
                      <option value="WFM">WFM</option>
                      <option value="Operations">Operations</option>
                      <option value="Other">Other</option>
                    </Select>
                  </div>
                </div>
  
                <div>
                  <Label htmlFor="value">Value</Label>
                  <div className="mt-1">
                    <Select
                      id="value"
                      name="value"
                      value={value}
                      onChange={e => {
                        setValue(e.target.value);
                      }}
                    >
                      <option value="Low">Low</option>
                      <option value="Mid">Mid</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="owner">Owner</Label>
                  <div className="mt-1">
                    <Select
                      id="owner"
                      name="owner"
                      value={owner}
                      onChange={e => {
                        setOwner(e.target.value);
                      }}
                    >
                      <option value="GMBPO Devs">GMBPO Devs</option>
                      <option value="Jorge">Jorge</option>
                      <option value="Abisai">Abisai</option>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="requester">Requester</Label>
                  <div className="mt-1 mb-4">
                    <TextInput
                      id="requester"
                      name="requester"
                      value={requester}
                      onChange={e => {
                        setRequester(e.target.value);
                      }}
                    />
                  </div>
                </div>
  
              </div>
              <div>
                <Label className="mt-2" htmlFor="description">Description</Label>
                <div className="mt-2">
                  <Textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={e => {
                      setDescription(e.target.value);
                    }}
                    style={{ overflow: 'hidden', height: '150px' }} />
                </div>
  
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                color="primary"
                onClick={(e) => { handleSubmit(e); }}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </> : <></>
    );
  };
  
  
  const DeleteUserModal: FC<any> = function ({ vendorID, active, sharedState, updateSharedState }: any) {
    const [isOpen, setOpen] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent, vendorID: any, active: any, created_user: any) => {
      e.preventDefault()
      try {
        const response = await axios.post('https://bn.glassmountainbpo.com:8080/giftCards/vendorStateChange', {
          vendorID,
          active,
          created_user
        })
        if (response.status == 200) {
          const responseData = response.data;
          updateSharedState(!sharedState);
          setOpen(false);
  
          if (responseData.message === "Vendor updated") {
            setOpen(false);
          } else {
            console.log("Fatal Error");
          }
        }
      } catch (error) {
        console.log(error);
        setOpen(false)
      }
    };
  
    return (
      created_user === "3199" || created_user === "3814" ?
        <>
          <Button color={(active == '1') ? "dark" : "dark"} onClick={() => setOpen(true)}>
            <div className="flex items-center gap-x-2">
              {(active == '1') ? <FaTimes color="white" className="text-lg" /> : <FaCheck color="white" className="text-lg" />}
            </div>
          </Button>
          <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
            <Modal.Header className="px-6 pt-6 pb-0">
              <span className="sr-only">Delete user</span>
            </Modal.Header>
            <Modal.Body className="px-6 pt-0 pb-6">
              <div className="flex flex-col items-center gap-y-6 text-center">
                {(active == '1') ? <FaTimes className="text-7xl text-red-500" /> : <FaCheck className="text-7xl text-green-500" />}
                <p className="text-xl text-gray-500">
                  {(active == '1') ? "Are you sure you want to deactivate this vendor?" : "Are you sure you want to activate this vendor?"}
                </p>
                <div className="flex items-center gap-x-3">
                  <Button color={(active == '1') ? "failure" : "success"} onClick={(e) => { handleSubmit(e, vendorID, active, created_user) }}>
                    Yes, I'm sure
                  </Button>
                  <Button color="gray" onClick={() => setOpen(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
        :
        <></>
    );
  };
  
  
  
  
  const SaveUserModal: FC<any> = function ({ taskID, name, state, porcentaje, sharedState, updateSharedState }: any) {
    const [isOpen, setOpen] = useState(false);
  
  
    const SaveTask = async (e: React.FormEvent, taskID: any, name: any, state: any, porcentaje: any, created_user: any) => {
      e.preventDefault()
      try {
        const response = await axios.post('https://bn.glassmountainbpo.com:8080/dev/DetailsTask', {
          taskID,
          name,
          porcentaje,
          state,
          created_user
        })
        if (response.status == 200) {
          const responseData = response.data;
          updateSharedState(!sharedState);
          setOpen(false);
  
          if (responseData.message === "Task updated") {
            setOpen(false);
          } else {
            console.log("Fatal Error");
          }
        }
      } catch (error) {
        console.log(error);
        setOpen(false)
      }
    };
  
    return (
      created_user === "3199" || created_user === "3814" ?
        <>
          <Button color={(state == '1') ? "dark" : "dark"} onClick={() => setOpen(true)}>
  
            <div className="flex items-center gap-x-2">
              {(state == '1') ? <BiSave color="white" className="text-lg" /> : <BiSave color="white" className="text-xl" />}
            </div>
          </Button>
          <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
            <Modal.Header className="px-6 pt-6 pb-0">
              <span className="sr-only">Delete user</span>
            </Modal.Header>
            <Modal.Body className="px-6 pt-0 pb-6">
              <div className="flex flex-col items-center gap-y-6 text-center">
                {(state == '1') ? <BiSave className="text-7xl text-red-500" /> : <FaCheck className="text-7xl text-green-500" />}
                <p className="text-xl text-gray-500">
                  {(state == '1') ? "Are you sure you want to deactivate this user?" : "Are you sure you want to activate this user?"}
                </p>
                <div className="flex items-center gap-x-3">
                  <Button color={(state == '1') ? "failure" : "success"} onClick={(e) => { SaveTask(e, taskID, name, state, porcentaje, created_user) }}>
                    Yes, I'm sure
                  </Button>
                  <Button color="gray" onClick={() => setOpen(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
        :
        <></>
    );
  };
  
  const ExportModal: FC<any> = function (rawData) {
    const [isOpen, setOpen] = useState(false);
    const data = rawData.data;
  
    // Function to convert an array to a CSV string
    const convertToCSV = (data: any) => {
      const csvRows = [];
      const headers = Object.keys(data[0]);
      csvRows.push(headers.join(','));
  
      for (const row of data) {
        const values = headers.map(header => row[header]);
        csvRows.push(values.join(','));
      }
  
      return csvRows.join('\n');
    };
  
    // Function to export data to CSV and prompt download
    const exportToCSV = () => {
      console.log(data);
      const csvContent = convertToCSV(data);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      setOpen(false);
    };
  
    // Function to convert an array to an XLS file
    const exportToXLS = () => {
      console.log(data);
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'users.xlsx');
      setOpen(false);
    };
  
    return (
      <>
        <Button onClick={() => setOpen(true)} color="gray">
          <div className="flex items-center gap-x-3">
            <HiDocumentDownload className="text-xl" />
            <span>Export</span>
          </div>
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Export users</strong>
          </Modal.Header>
          <Modal.Body className="flex flex-col items-center gap-y-6 text-center">
            <div className="flex items-center gap-x-3">
              <div>
                <Button onClick={exportToCSV} color="light">
                  <div className="flex items-center gap-x-3">
                    <FiletypeCsv className="text-xl" />
                    <span>Export CSV</span>
                  </div>
                </Button>
              </div>
              <div>
                <Button onClick={exportToXLS} color="light">
                  <div className="flex items-center gap-x-3">
                    <FiletypeXlsx className="text-xl" />
                    <span>Export XLSX</span>
                  </div>
                </Button>
              </div>
            </div>
          </Modal.Body>
  
        </Modal>
      </>
    )
  
  }
  
  const DeleteUsersModal: FC<any> = function ({ users, created_user, sharedState, updateSharedState }) {
    const [isOpen, setOpen] = useState(false);
    const dataToSend = users;
  
    const handleSubmit = async (e: React.FormEvent, dataToSend: string, created_user: any) => {
      e.preventDefault()
      try {
        const response = await axios.post('https://bn.glassmountainbpo.com:8080/api/deactivateUsers', {
          dataToSend,
          created_user
        })
        if (response.status == 200) {
          const responseData = response.data;
          updateSharedState(!sharedState);
          setOpen(false);
  
  
          if (responseData.message === "Users successfully deactivated") {
            setOpen(false);
          } else {
            console.log('Bad Fail')
          }
        }
      } catch (error) {
        console.log(error);
        setOpen(false);
      }
    };
  
    return (
      <a
        className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <FaTimes className="text-2xl" onClick={() => setOpen(true)} />
        <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
          <Modal.Header className="px-6 pt-6 pb-0">
            <span className="sr-only">Delete user(s)</span>
          </Modal.Header>
          <Modal.Body className="px-6 pt-0 pb-6">
            <div className="flex flex-col items-center gap-y-6 text-center">
              <FaTimes className="text-7xl text-red-500" />
              <p className="text-xl text-gray-500">
                Are you sure you want to deactivate {users.length} user(s)?
              </p>
              <div className="flex items-center gap-x-3">
                <Button color="failure" onClick={(e) => handleSubmit(e, dataToSend, created_user)}>
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => setOpen(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </a>
    );
  };
  
  const ActivateUsersModal: FC<any> = function ({ users, created_user, sharedState, updateSharedState }) {
    const [isOpen, setOpen] = useState(false);
    const dataToSend = users;
  
    const handleSubmit = async (e: React.FormEvent, dataToSend: string, created_user: any) => {
      e.preventDefault()
      try {
        const response = await axios.post('https://bn.glassmountainbpo.com:8080/api/activateUsers', {
          dataToSend,
          created_user
        })
        if (response.status == 200) {
          const responseData = response.data;
          updateSharedState(!sharedState);
          setOpen(false);
  
          if (responseData.message === "Users successfully activated") {
            setOpen(false);
          } else {
            console.log('Bad Fail')
          }
        }
      } catch (error) {
        console.log(error);
        setOpen(false);
      }
    };
  
    return (
      <a
        className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <FaCheck className="text-2xl" onClick={() => setOpen(true)} />
        <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
          <Modal.Header className="px-6 pt-6 pb-0">
            <span className="sr-only">Activate user(s)</span>
          </Modal.Header>
          <Modal.Body className="px-6 pt-0 pb-6">
            <div className="flex flex-col items-center gap-y-6 text-center">
              <FaCheck className="text-7xl text-green-500" />
              <p className="text-xl text-gray-500">
                Are you sure you want to activate {users.length} user(s)?
              </p>
              <div className="flex items-center gap-x-3">
                <Button color="success" onClick={(e) => handleSubmit(e, dataToSend, created_user)}>
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => setOpen(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </a>
    );
  };
  
  
  
  
  export default Vendors;