import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { Modal as AlertModal } from "antd";
import Icon from "../../shared/components/icon";
import CEInputText from "../../shared/widgets/text";
import { toast } from "../../base/toast";
import { SpinnerLoader } from "../../base/loader";
import { PrimaryButton } from "../../shared/widgets/button";
import { Modal, Header, BodyContent, Footer, } from "../../shared/components/model";
import { SecondaryButton } from "../../shared/widgets/button";
import { AdminService } from "../admin.service";
import { trackEvent } from "../../analytics";
import styles from "./integrations.module.scss";
import * as moment from "moment";
import { getSubDomain } from "../../utils/helpers";
import GsuitePermissionSlider from "../../shared/components/GsuitePermissionSlider/index";
import azureImg from "../../shared/images/microsoft-azure.svg";
import oktaImg from "../../shared/images/Okta_small.svg";
import Typography from '../../shared/components/typography';

export const SSO = (props) => {
  const [ssoSetup,setSsoSetup] = useState({
    tenantId: "",
    clientId: "",
    clientSecret: "",
    domain: "",
    token: "",
    logo: "",
  })
  const [iSloader,setISloader] =useState(false)
  const [visible,setVisible] =useState(false)
  const [appType,setAppType] =useState("")
  const [openGsuitePermissionSlider,setOpenGsuitePermissionSlider] =useState(false)

  const setup = async (item) => {
    if (["GSUITE"].includes(item.appType)) {
      try{
        const data = await AdminService.oAuth(item.appType)
        if(data) {
          openOauthPage(data.url, item.appType);
        }
      } catch (err) {}
    }
    if (item.appType === "OKTA") {
      // this.modalRef.open();
      connect();
      setSsoSetup(item)
    } else if (item.appType === "AZURE_AD") {
      // this.azureModalRef.open();
      setSsoSetup(item)
    }
  };

  const openOauthPage = (data, appType) => {
    const popup = openPopup();
    popup.location = data;
    polling(popup, appType);
  }

  const openPopup = () => {
    const w = screen.width * 0.75;
    const h = screen.height * 0.8;
    const left = 100;
    const top = 50;
    return window.open(
      "",
      "",
      `toolbar=no, location=no, 
        directories=no, status=no, 
        menubar=no, scrollbars=no, 
        resizable=no, copyhistory=no, 
        width=${w}, height=${h}, top=${top}, left=${left}`
    );
  }

  const polling = (popup, appType) => {
    const polling = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(polling);
        console.log("Popup has been closed by user");
        props.getIntegrationsList();
      }
      const closeDialog = () => {
        props.getIntegrationsList();
        clearInterval(polling);
        popup.close();
      };
      try {
        const subdomain = getSubDomain();
        if (
          popup.location.hostname === `${subdomain}.cedevlocal.com` ||
          popup.location.hostname === `${subdomain}.cedevlocal.com` ||
          popup.location.hostname === `${subdomain}.cloudeagle.us` ||
          popup.location.hostname === `${subdomain}.cloudeagle.ai` ||
          popup.location.hostname === `${subdomain}.cloudeagle.info` ||
          popup.location.hostname === "localhost"
        ) {
          if (popup.location.search) {
            if (["GSUITE"].includes(appType)) {
              AdminService.callbackUrl(appType, popup.location.search).then(
                (data) => {
                  if (data["status"] === 500 || data["status"] === 400) {
                    return toast.error(data["message"]);
                  }
                  trackEvent({
                    category: "ADMIN INTEGRATIONS",
                    action: "CONNECT",
                    value: appType,
                    label: "SSO",
                  });
                  this.props.getIntegrationsList();
                },
                (err) => {
                  return toast.error(err["message"]);
                }
              );
            } else {
              AdminService.quickbookSearch(popup.location.search).then(
                (data) => {
                  if (data["status"] === 500 || data["status"] === 400) {
                    return toast.error(data["message"]);
                  }
                  trackEvent({
                    category: "ADMIN INTEGRATIONS",
                    action: "CONNECT",
                    value: appType,
                    label: "SSO",
                  });
                  props.getIntegrationsList();
                },
                (err) => {
                  toast.error(err["message"]);
                }
              );
            }
            closeDialog();
          }
          closeDialog();
          console.log("sss");
        }
      } catch (error) {
        console.log(error);
      }
    }, 500);
  }

  const closeModal = () => {
    // this.modalRef.close();
    // this.azureModalRef.close();
  };

  const setDoczData = (evt) => {
    updateFormData(evt.target.name, evt.target.value);
  };

  const updateFormData = (key, value) => {
    let updateFormData = Object.assign(this.state.ssoSetup, { [key]: value });
    setSsoSetup(updateFormData)
  };

  const saveAndUpdate = async () => {
    try{
      const data = await AdminService.upsertIntegrations(
        { domain: this.state.ssoSetup.domain, token: this.state.ssoSetup.token },
        "okta"
      )
        if(data) {
          if (data["status"] === 500 || data["status"] === 400) {
            toast.error(data["message"]);
            return;
          }
          trackEvent({
            category: "ADMIN INTEGRATIONS",
            action: "CONNECT",
            value: this.state.ssoSetup.appType,
            label: "SSO",
          });
          this.closeModal();
          this.props.getIntegrationsList();
          toast.success(`Information saved successfully.`);
        }
    } catch (err) {
      // this.closeModal();
      toast.error(`Information save failed.`);
    }
  };

  const saveAndUpdateAzure = async () => {
    if (this.state.ssoSetup) {
      if (
        !this.state.ssoSetup.tenantId ||
        !this.state.ssoSetup.tenantId.trim().length
      ) {
        return toast.error(`Please enter Tenant ID`);
      }
      if (
        !this.state.ssoSetup.clientId ||
        !this.state.ssoSetup.clientId.trim().length
      ) {
        return toast.error(`Please enter Client ID`);
      }
      if (
        !this.state.ssoSetup.clientSecret ||
        !this.state.ssoSetup.clientSecret.trim().length
      ) {
        return toast.error(`Please enter Client Secret`);
      }
    }
    AdminService.upsertIntegrations(
      {
        appType: this.state.ssoSetup.appType,
        clientId: this.state.ssoSetup.clientId,
        clientSecret: this.state.ssoSetup.clientSecret,
        tenantId: this.state.ssoSetup.tenantId,
      },
      "azuread"
    ).then(
      (data) => {
        if (data["status"] === 500 || data["status"] === 400) {
          toast.error(data["message"]);
          return;
        }
        trackEvent({
          category: "ADMIN INTEGRATIONS",
          action: "CONNECT",
          value: this.state.ssoSetup.appType,
          label: "SSO",
        });
        this.closeModal();
        this.props.getIntegrationsList();
        toast.success(`Information saved successfully.`);
      },
      (err) => {
        this.closeModal();
        toast.error(`Information save failed.`);
      }
    );
  };

} 