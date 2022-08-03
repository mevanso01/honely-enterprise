import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Pagination } from './Shared'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "../styles/LeadsList.css";

function LeadsList (props) {
    const [leadsList, setLeadsList] = useState({ loading: true, users: [], error: null })
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
                users: response.data.data.users,
                error: null
            })
            setPagination({
                ...pagination,
                currentPage: page,
                total: response.data.data?.total_users || 0
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
                                <tr>
                                    <td><Skeleton width={50} height={14} /></td>
                                    <td><Skeleton width={300} height={14} /></td>
                                    <td><Skeleton width={40} height={14} /></td>
                                    <td><Skeleton width={80} height={14} /></td>
                                    <td><Skeleton width={100} height={14} /></td>
                                    <td><Skeleton width={100} height={14} /></td>
                                </tr>
                            ))
                        ) : (
                            leadsList.users.map(user => (
                                <tr key={user?.lead_id}>
                                    <td>{user.full_name}</td>
                                    <td>{user.searched_address}</td>
                                    <td>{user?.type}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone_number}</td>
                                    <td>{user.application_date.split('.')[0]}</td>
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