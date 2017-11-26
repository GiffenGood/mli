# Setup

```javascript

import * as fbAdmin from "firebase-admin";

let oracleConfig = {
    user: '',
    password: '',
    connectString: ''
}

let fbConfig : fbAdmin.ServiceAccount = {
    projectId : "",
    privateKey : "",
    clientEmail : ""
}

let fbDBURL = "";

export { oracleConfig, fbConfig, fbDBURL }

```

1. OracelDB needed to be installed with 2015 command prompt in admin.