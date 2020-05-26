define({ "api": [
  {
    "type": "post",
    "url": "updatepassword",
    "title": "Update Password",
    "version": "0.0.1",
    "description": "<p>API ของ Upload Password</p>",
    "group": "Profile",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Body:",
          "content": "{\n      \"user_password\": \"\",\n      \"user_password_new\": \"\",\n      \"user_password_confirm\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n  \"response\": true,\n  \"message\": \"200 OK\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/profile.controller.js",
    "groupTitle": "Profile",
    "name": "PostUpdatepassword"
  },
  {
    "type": "post",
    "url": "updateprofile",
    "title": "Update Profile",
    "version": "0.0.1",
    "description": "<p>API ของ Update Profile</p>",
    "group": "Profile",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Body:",
          "content": "{\n      \"user_fullname\": \"\",\n      \"user_email\": \"\",\n      \"user_address\": \"\",\n      \"user_tel\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n  \"response\": true,\n  \"message\": \"200 OK\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/profile.controller.js",
    "groupTitle": "Profile",
    "name": "PostUpdateprofile"
  },
  {
    "type": "post",
    "url": "uploadprofile",
    "title": "Upload Profile",
    "version": "0.0.1",
    "description": "<p>API ของ Upload Profile</p>",
    "group": "Profile",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Body:",
          "content": "{\n      \"user_image\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n  \"response\": true,\n  \"message\": \"200 OK\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/profile.controller.js",
    "groupTitle": "Profile",
    "name": "PostUploadprofile"
  }
] });
