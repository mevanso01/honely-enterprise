import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Pagination } from './Shared'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "../styles/LeadsList.css";

function LeadsList (props) {
    const [leadsList, setLeadsList] = useState({ loading: true, leads: [], error: null })
    const [pagination, setPagination] = useState({ currentPage: 1, pageSize: 5, total: null })
    
    const getLeads = (page = 1) => {
        setLeadsList({
            ...leadsList,
            loading: true
        })
        const config = {
            headers: {
              'Authorization': 'Bearer ' + props.jwt
            }
        }
        axios.get(`https://developers.honely.com/leads?limit=${pagination.pageSize}&offset=${(page - 1) * pagination.pageSize}`, config)
        .then(response => {
            setLeadsList({
                loading: false,
                leads: response.data.data.leads,
                error: null
            })
            setPagination({
                ...pagination,
                currentPage: page,
                total: response.data.data?.total_leads || 0
              })
        })
        .catch(error => {
            if (error.message === 'Request failed with status code 401') {
              props.doSignOut()
            } else {
              setLeadsList({
                ...leadsList,
                loading: false,
                error: error.message
              })
            }
          })
    }

    const handleChangePage = (page) => {
        setPagination({
          ...pagination,
          currentPage: page
        })
        getLeads(page)
      }
    const getLeadType = (lead) => {
        let type = ''
        if (lead?.additional_polls) {
            const purposePoll = lead.additional_polls.find(poll => poll.field_key === 'purpose')
            if (purposePoll) {
                type = purposePoll.options.join(', ')
            }
        }
        return type
    }

    const getPhoneNumber = (lead) => {
        let phone = ''
        if (lead?.additional_inputs) {
            const phoneInput = lead.additional_inputs.find(input => input.field_key === 'phone_number')
            if (phoneInput) {
                phone = phoneInput['field-value']
            }
        }
        return phone
    }

    useEffect(() => {
        getLeads()
    }, [])
    return (
        <div className='section'>
            <div className='leads-list'>
                <p>Leads</p>
                <div className="leads-list-greybar">
                    <span className="mdi mdi-download" style={{float: 'right', fontSize: '32px', color: '#000000CC'}}></span>
                </div>

                <div className="leads-list-table">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Type</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Date</th>
                        </tr>
                        {leadsList.loading ? (
                            [...Array(pagination.pageSize).keys()].map(i => (
                                <tr key={i}>
                                    <td><Skeleton width={50} height={14} /></td>
                                    <td><Skeleton width={300} height={14} /></td>
                                    <td><Skeleton width={40} height={14} /></td>
                                    <td><Skeleton width={80} height={14} /></td>
                                    <td><Skeleton width={100} height={14} /></td>
                                    <td><Skeleton width={100} height={14} /></td>
                                </tr>
                            ))
                        ) : (
                            leadsList.leads.map(lead => (
                                <tr key={lead?.lead_id}>
                                    <td>{lead.full_name}</td>
                                    <td>{lead.searched_address}</td>
                                    <td>{getLeadType(lead)}</td>
                                    <td>{lead.email}</td>
                                    <td>{getPhoneNumber(lead)}</td>
                                    <td>{lead.application_date.split('.')[0]}</td>
                                </tr>
                            ))
                        )}
                    </table>
                </div>
                <div className="pagination-wrapper">
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={Math.ceil(pagination.total / pagination.pageSize)}
                        handleChangePage={handleChangePage}
                    />
                </div>
            </div>
        </div>
    )
}

export default LeadsList;