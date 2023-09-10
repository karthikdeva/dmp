

import React,  {useState}from "react";

import { useQuery, useMutation } from '@apollo/client';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'; 

import {dateBodyTemplate, imageBodyTemplate} from '../../lib/utilities'
import { CITIZENS , DELETE_CITIZEN, NEW_CITIZEN, UPDATE_CITIZEN } from "../../graphQL/citizen.gql";
import Kspinner from "../../components/Spinner";
import SearchBox from "../../components/SearchBox";
import SidebarForm from "../../components/SidebarForm";

import {  DEFAULT_PAGEINATION_CONFIG, NO_OF_RECORDS_PER_PAGE, LABEL_ADD } from "../../lib/constants/common.constants";
import { COLUMNS , CITIZEN_FIELDS, DEFAULT_CITIZEN } from "../../lib/constants/citizen.constants";

const Citizen = () => {
    const NODATALABEL = 'No record found.';
    const mutationCallBack = {
        refetchQueries: [
            CITIZENS, 
            'Citizens'
          ],
    }
    const { loading, error, data, refetch } = useQuery(CITIZENS, {
        variables:{first:NO_OF_RECORDS_PER_PAGE,offset:0, search:''}
      });

     const [deleteCitizen,  deleteInfo ] = useMutation(DELETE_CITIZEN,mutationCallBack);
     const [updateCitizen,  updateInfo ] = useMutation(UPDATE_CITIZEN,mutationCallBack);
     const [createCitizen,  createInfo ] = useMutation(NEW_CITIZEN,mutationCallBack);
    
    
    const pageTitle = "Citizens";
    const LABEL_EDIT_PAYMENT_TYPE= `Edit Citizen`;
    const LABEL_ADD_PAYMENT_TYPE= `Add Citizen`;
    const [selectedCitizen, setSelectedCitizen] = useState(DEFAULT_CITIZEN);
    const [formTitle, setFormTitle] = useState(LABEL_ADD_PAYMENT_TYPE);
    const [showForm, setShowForm] = useState(false);
    // const [readOnlyView, setReadOnlyView ]= useState(false);
    const [lazyParams, setLazyParams] = useState(DEFAULT_PAGEINATION_CONFIG);

    const onSubmit =(formData)=>{

        const payLoad ={variables: {
            citizenData:{
           ...formData
            }
        }}

        if(!selectedCitizen.citizenId){
            createCitizen(payLoad);
          //  onCloseForm(true);
            return;
        }
        payLoad.variables.citizenData = {
        ...payLoad.variables.citizenData,
        id:selectedCitizen.citizenId
        }
        delete  payLoad.variables.citizenData.citizenId;
        delete  payLoad.variables.citizenData.modifiedAt;
        updateCitizen(payLoad);
        onCloseForm(true);
    }

    // const viewCitizen =(selectedCitizen)=>{
    //     readOnlyView, setReadOnlyView
    // }
    const editCitizen = (selectedCitizen) => {
        setShowForm(true);
        const tempValue = {...selectedCitizen.node};
        delete tempValue.__typename;
        delete tempValue.modifiedAt;
        setSelectedCitizen(tempValue);
        setFormTitle(LABEL_EDIT_PAYMENT_TYPE);
    }
    const addCitizen = ()=>{
        setSelectedCitizen(DEFAULT_CITIZEN);
        setFormTitle(LABEL_ADD_PAYMENT_TYPE);  
        setShowForm(true);
    }
   
    const onDeleteCitizen = (item)=>{
        const payLoad ={variables: {"id": item.node.code}}
        confirmDialog({
            message: `Are you sure you want to delete ${item.node.name}?`,
            header: 'Confirmation',
            icon: 'fas fa-exclamation-triangle',
            accept: () =>  deleteCitizen(payLoad),
            reject: () => console.log("cancelled")
        });

    }

    const onOpenForm=()=>{
        setShowForm(true);
    }
    
    const onCloseForm=(requireReload=false)=>{
        setShowForm(false);
        if(requireReload){
            refetch({first:NO_OF_RECORDS_PER_PAGE,offset:0});
            setLazyParams(DEFAULT_PAGEINATION_CONFIG);
        }
    }

    const onSearch = (value) => {
        refetch({"search":value,first:NO_OF_RECORDS_PER_PAGE,offset:0}) 
        setLazyParams(DEFAULT_PAGEINATION_CONFIG);
    }
    const refreshData = ()=>{
        refetch({first:NO_OF_RECORDS_PER_PAGE,offset:0}) 
        setLazyParams(DEFAULT_PAGEINATION_CONFIG);
    }
    const onPage = (event) => {
        let _lazyParams = { ...lazyParams, ...event };
        refetch({"first":event.rows,offset:(event.first)}) 
        setLazyParams(_lazyParams);
    }
    


    if (loading || updateInfo.loading || createInfo.loading ||  deleteInfo.loading) return <Kspinner/>;
    if (error || deleteInfo.error) return <p>Error :(</p>;

    const dynamicColumns = COLUMNS.map((col) => {
        if(col.field==='node.image'){
            return <Column key={col.field} sortable field={col.field} header={col.header} body={imageBodyTemplate} />;
        }
        if(col.field==='node.modifiedAt'){
            return <Column key={col.field} sortable field={col.field} header={col.header} body={dateBodyTemplate} />;
        }
        return <Column key={col.field} sortable field={col.field} header={col.header} />;
    });
    
    const renderHeader = () => {
        return (
            <div className="table-header flex items-center justify-between">
                <h4>{pageTitle}</h4>
                <div className="form-right flex items-center">
                <button className="btn btn-primary mr-2"  title="Reload" onClick={() => refreshData()}> <i className="fas fa-sync"></i></button>
                <button className="btn btn-primary mr-2" onClick={() => addCitizen()}> <i className="fas fa-user-plus"></i>{LABEL_ADD}</button>
                        <SearchBox onInput={onSearch} placeholder="Search"/>
                </div>
            </div>
        );
    }
  
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="fas fa-edit" className="p-button-rounded p-button-success mr-2" onClick={() => editCitizen(rowData)} />
                <Button icon="fas fa-trash" className="p-button-rounded p-button-danger mr-2" onClick={() => onDeleteCitizen(rowData)} />
            </React.Fragment>
        );
    }
       
    return (
        <>
       
               <div className="flex">
                    <div className="grow border-x">
                        <DataTable header={renderHeader()} loading={loading || deleteInfo.loading} sortField="node.code" sortOrder={-1} dataKey="code" rowHover className="p-datatable-Citizens" paginator  emptyMessage={NODATALABEL}  value={data.items.edges} lazy  first={lazyParams.first} rows={lazyParams.rows} totalRecords={data.items.totalCount} onPage={onPage} >
                            {dynamicColumns}
                            {<Column body={actionBodyTemplate} headerStyle={{ width: '8em', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }}></Column>}
                        </DataTable>
                    </div>
                </div>
                 <SidebarForm showForm={showForm} onSubmit={onSubmit}  onOpenForm={onOpenForm} fields={CITIZEN_FIELDS} formValues={selectedCitizen} formTitle={formTitle} onCloseForm={onCloseForm}></SidebarForm>
         
        </>
    )
}
export default Citizen;

