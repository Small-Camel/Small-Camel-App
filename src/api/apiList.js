import { wxRequest } from "../utils/wxRequest";
import Mock from 'mockjs';

const DEBUG = true;
const basicUrl = "localhost:8080";

//===============================卖家===================================

const registAccountMock = JSON.stringify(Mock.mock({
    
}))

const registAccount = params =>
  wxRequest(
    params,
    basicUrl + "/account"
  );
