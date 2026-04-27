# AdminControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**_delete**](#_delete) | **DELETE** /api/v1/admin/users/{id} | |
|[**addBlog**](#addblog) | **POST** /api/v1/admin/blogs | |
|[**deleteBlog**](#deleteblog) | **DELETE** /api/v1/admin/blogs/{id} | |
|[**deleteProperty**](#deleteproperty) | **DELETE** /api/v1/admin/properties/{id} | |
|[**getAdmins**](#getadmins) | **GET** /api/v1/admin/admins | |
|[**getBlogs**](#getblogs) | **GET** /api/v1/admin/blogs | |
|[**getLawyers**](#getlawyers) | **GET** /api/v1/admin/lawyers | |
|[**getProperties1**](#getproperties1) | **GET** /api/v1/admin/properties | |
|[**getUsers**](#getusers) | **GET** /api/v1/admin/users | |
|[**registerAdmin**](#registeradmin) | **POST** /api/v1/admin/admins | |
|[**registerLawyer**](#registerlawyer) | **POST** /api/v1/admin/lawyers | |
|[**registerUser**](#registeruser) | **POST** /api/v1/admin/users | |
|[**searchAdmin**](#searchadmin) | **GET** /api/v1/admin/admins/search | |
|[**searchBlog**](#searchblog) | **GET** /api/v1/admin/blogs/search | |
|[**searchLawyer**](#searchlawyer) | **GET** /api/v1/admin/lawyers/search | |
|[**searchProperty**](#searchproperty) | **GET** /api/v1/admin/properties/search | |
|[**searchUser**](#searchuser) | **GET** /api/v1/admin/users/search | |
|[**updateBlog**](#updateblog) | **PATCH** /api/v1/admin/blogs/{id} | |

# **_delete**
> object _delete()


### Example

```typescript
import {
    AdminControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance._delete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**object**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **addBlog**
> BlogCreationResponse addBlog(blogRequest)


### Example

```typescript
import {
    AdminControllerApi,
    Configuration,
    BlogRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let blogRequest: BlogRequest; //

const { status, data } = await apiInstance.addBlog(
    blogRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **blogRequest** | **BlogRequest**|  | |


### Return type

**BlogCreationResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteBlog**
> object deleteBlog()


### Example

```typescript
import {
    AdminControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteBlog(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**object**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteProperty**
> object deleteProperty()


### Example

```typescript
import {
    AdminControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteProperty(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**object**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAdmins**
> PageResponseAppUserResponse getAdmins()


### Example

```typescript
import {
    AdminControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 10)

const { status, data } = await apiInstance.getAdmins(
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 10|


### Return type

**PageResponseAppUserResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getBlogs**
> PageResponseBlogAdminsResponse getBlogs()


### Example

```typescript
import {
    AdminControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 10)

const { status, data } = await apiInstance.getBlogs(
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 10|


### Return type

**PageResponseBlogAdminsResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getLawyers**
> PageResponseAppUserResponse getLawyers()


### Example

```typescript
import {
    AdminControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 10)

const { status, data } = await apiInstance.getLawyers(
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 10|


### Return type

**PageResponseAppUserResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getProperties1**
> PageResponsePropertyAdminResponse getProperties1()


### Example

```typescript
import {
    AdminControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 10)

const { status, data } = await apiInstance.getProperties1(
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 10|


### Return type

**PageResponsePropertyAdminResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUsers**
> PageResponseAppUserResponse getUsers()


### Example

```typescript
import {
    AdminControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 10)

const { status, data } = await apiInstance.getUsers(
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 10|


### Return type

**PageResponseAppUserResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **registerAdmin**
> RegistrationResponse registerAdmin(registrationRequest)


### Example

```typescript
import {
    AdminControllerApi,
    Configuration,
    RegistrationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let registrationRequest: RegistrationRequest; //

const { status, data } = await apiInstance.registerAdmin(
    registrationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registrationRequest** | **RegistrationRequest**|  | |


### Return type

**RegistrationResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **registerLawyer**
> RegistrationResponse registerLawyer(registrationRequest)


### Example

```typescript
import {
    AdminControllerApi,
    Configuration,
    RegistrationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let registrationRequest: RegistrationRequest; //

const { status, data } = await apiInstance.registerLawyer(
    registrationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registrationRequest** | **RegistrationRequest**|  | |


### Return type

**RegistrationResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **registerUser**
> RegistrationResponse registerUser(registrationRequest)


### Example

```typescript
import {
    AdminControllerApi,
    Configuration,
    RegistrationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let registrationRequest: RegistrationRequest; //

const { status, data } = await apiInstance.registerUser(
    registrationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registrationRequest** | **RegistrationRequest**|  | |


### Return type

**RegistrationResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **searchAdmin**
> PageResponseAppUserResponse searchAdmin()


### Example

```typescript
import {
    AdminControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let text: string; // (default to undefined)
let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 10)

const { status, data } = await apiInstance.searchAdmin(
    text,
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **text** | [**string**] |  | defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 10|


### Return type

**PageResponseAppUserResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **searchBlog**
> PageResponseBlogAdminsResponse searchBlog()


### Example

```typescript
import {
    AdminControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let text: string; // (default to undefined)
let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 10)

const { status, data } = await apiInstance.searchBlog(
    text,
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **text** | [**string**] |  | defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 10|


### Return type

**PageResponseBlogAdminsResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **searchLawyer**
> PageResponseAppUserResponse searchLawyer()


### Example

```typescript
import {
    AdminControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let text: string; // (default to undefined)
let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 10)

const { status, data } = await apiInstance.searchLawyer(
    text,
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **text** | [**string**] |  | defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 10|


### Return type

**PageResponseAppUserResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **searchProperty**
> PageResponsePropertyAdminResponse searchProperty()


### Example

```typescript
import {
    AdminControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let text: string; // (default to undefined)
let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 10)

const { status, data } = await apiInstance.searchProperty(
    text,
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **text** | [**string**] |  | defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 10|


### Return type

**PageResponsePropertyAdminResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **searchUser**
> PageResponseAppUserResponse searchUser()


### Example

```typescript
import {
    AdminControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let text: string; // (default to undefined)
let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 10)

const { status, data } = await apiInstance.searchUser(
    text,
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **text** | [**string**] |  | defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 10|


### Return type

**PageResponseAppUserResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateBlog**
> object updateBlog(blogRequest)


### Example

```typescript
import {
    AdminControllerApi,
    Configuration,
    BlogRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminControllerApi(configuration);

let id: number; // (default to undefined)
let blogRequest: BlogRequest; //

const { status, data } = await apiInstance.updateBlog(
    id,
    blogRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **blogRequest** | **BlogRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**object**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

