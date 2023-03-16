import React, { useEffect, useState } from 'react';
import SolidIcon from '../_ui/Icon/SolidIcons';
import { useTranslation } from 'react-i18next';
import { ButtonSolid } from '../_ui/AppButton/AppButton';
import { toast } from 'react-hot-toast';

function InviteUsersForm({ props, onClose, createUser }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <div className="animation-fade invite-user-drawer-wrap">
        <div className="drawer-card-wrap invite-user-drawer-wrap">
          <div className="card-header">
            <div className="card-header-inner-wrap">
              <h3 className="tj-text-lg tj-text font-weight-500" data-cy="add-new-user">
                {t('header.organization.menus.manageUsers.addNewUser', 'Add new user')}
              </h3>
              <div onClick={() => onClose()} style={{ cursor: 'pointer' }}>
                <SolidIcon name="remove" width="16" />
              </div>
            </div>
            <div className="tj-drawer-tabs-container-outer">
              <div className="tj-drawer-tabs-container">
                <button
                  className={`tj-drawer-tabs-btn tj-text-xsm ${activeTab == 1 && 'tj-drawer-tabs-btn-active'}`}
                  onClick={() => setActiveTab(1)}
                >
                  <SolidIcon name="mail" width="14" fill={activeTab == 1 ? '#11181C' : '#687076'} />
                  <span> Invite with email</span>
                </button>
                <button
                  className={`tj-drawer-tabs-btn  tj-text-xsm ${activeTab == 2 && 'tj-drawer-tabs-btn-active'}`}
                  onClick={() => setActiveTab(2)}
                >
                  <SolidIcon name="fileupload" width="14" fill={activeTab == 2 ? '#11181C' : '#687076'} />
                  <span>Upload CSV file</span>
                </button>
              </div>
            </div>
          </div>
          {activeTab == 1 ? (
            <div className="manage-users-drawer-content">
              <div className="invite-user-by-email">
                <form onSubmit={createUser} noValidate className="invite-email-body">
                  <label className="form-label" data-cy="email-label">
                    {t('header.organization.menus.manageUsers.fullName', 'Enter full name')}
                  </label>
                  <div className="form-group mb-3 ">
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t('header.organization.menus.manageUsers.enterFirstName', 'Enter full name')}
                        name="fullName"
                        //   onChange={changeNewUserOption.bind(this, 'fullName')}
                        //   value={fields['fullName']}
                      />
                      <span className="text-danger" data-cy="first-name-error">
                        {/* {errors['fullName']} */}
                      </span>
                    </div>
                  </div>
                  <div className="form-group mb-3 ">
                    <label className="form-label" data-cy="email-label">
                      {t('header.organization.menus.manageUsers.emailAddress', 'Email Address')}
                    </label>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder={t('header.organization.menus.manageUsers.enterEmail', 'Enter Email')}
                        name="email"
                        //   onChange={changeNewUserOption.bind(this, 'email')}
                        //   value={fields['email']}
                        data-cy="email-input"
                      />
                      <span className="text-danger" data-cy="email-error">
                        {/* {errors['email']} */}
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="manage-users-drawer-content-bulk">
              <div>
                <div className="user-csv-template-wrap">
                  <SolidIcon name="information" fill="#F76808" width="28" />

                  <div>
                    <p className="tj-text tj-text-sm">
                      Download the ToolJet template to add user details or format your file in the same as the template.
                      ToolJet won’t be able to recognise files in any other format.{' '}
                    </p>
                    <ButtonSolid
                      href="../../assets/csv/sample_upload.csv"
                      download="sample_upload.csv"
                      variant="tertiary"
                      className="download-template-btn"
                    >
                      Download Template
                    </ButtonSolid>
                  </div>
                </div>
                {/* <form onSubmit={inviteBulkUsers} noValidate className="upload-user-form"> */}
                <form className="upload-user-form">
                  <div className="form-group mb-3 ">
                    <div>
                      <p className="tj-text tj-text-md font-weight-500 select-csv-text">Select a CSV file to upload</p>
                      <span className="tj-text tj-text-sm drag-and-drop-text">Or drag and drop it here</span>
                      <input
                        hidden
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (Math.round(file.size / 1024) > 1024) {
                            toast.error('File size cannot exceed more than 1MB');
                            e.target.value = null;
                          } else {
                            //   handleFileChange(file);
                          }
                        }}
                        accept=".csv"
                        type="file"
                        className="form-control"
                      />
                      <span className="text-danger" data-cy="file-error">
                        {/* {errors['file']} */}
                      </span>
                      {/* <div className="col-6">
                                        <a
                                          className="btn btn-primary"
                                          role="button"
                                          href="../../assets/csv/sample_upload.csv"
                                          download="sample_upload.csv"
                                        >
                                          Download Template
                                        </a>
                                      </div> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="manage-users-drawer-footer">
            <ButtonSolid
              data-cy="cancel-button"
              // onClick={() => {
              //   setState({
              //     showUploadUserForm: false,
              //     errors: {},
              //     file: null,
              //   });
              //   setShowNewUserForm();
              // }}
              variant="tertiary"
            >
              {t('globals.cancel', 'Cancel')}
            </ButtonSolid>

            <ButtonSolid
              type="submit"
              variant="primary"
              // className={`btn mx-2 btn-primary ${uploadingUsers ? 'btn-loading' : ''}`}
              // disabled={uploadingUsers}
              data-cy="create-users-button"
              leftIcon="sent"
              width="20"
              fill={'#FDFDFE'}
            >
              {t('header.organization.menus.manageUsers.inviteUsers', 'Invite Users')}
            </ButtonSolid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviteUsersForm;