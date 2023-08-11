// src/api.js

// fragments microservice API, defaults to localhost:8080
const apiUrl = process.env.API_URL || 'http://localhost:8080';

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
// GET fragment
export async function getUserFragments(user) {
  console.log('Requesting user fragments data...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Got user fragments data', { data });
  } catch (err) {
    console.error('Unable to call GET /v1/fragment', { err });
  }
}

// GET expanded fragments
export async function getUserFragmentsExpanded(user) {
  console.log('Requesting user fragments expanded data...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments?expand=1`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Got user fragments expanded data', { data });
    return data
  } catch (err) {
    console.error('Unable to call GET /v1/fragments', { err });
  }
}

// POST fragment
export async function postUserFragments(user, type, content) {
  console.log("User just post a '", type, "' fragment");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.idToken}`,
        "Content-Type": type,
      },
      body: content
    })
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Post user fragments data', { data });
  } catch (err) {
    console.error('Unable to call POST /v1/fragments', { err });
  }
}

// PUT fragment
export async function putUserFragments(user, id, content) {
  console.log("User just put a '", id, "' fragment");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      },
      body: content
    })
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    // const data = await res.json();
    console.log('Update user fragments data', { id });
  } catch (err) {
    console.error('Unable to call PUT /v1/fragments', { err });
  }
}

// DELETE fragment
export async function deleteUserFragments(user, id) {
  console.log("User just delete a '", id, "' fragment");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      }
    })
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    // const data = await res.json();
    console.log('Delete user fragments data', { id });
  } catch (err) {
    console.error('Unable to call DELETE /v1/fragments', { err });
  }
}

// CONVERT fragment
export async function convertUserFragments(user, id, type) {
  console.log("User just convert a '", id, "' fragment into ", type);
  try {
    var type_ext = "";
    switch (type) {
      case "text/plain":
        type_ext = ".txt";
        break;
      case "text/markdown":
        type_ext = ".md";
        break;
      case "text/html":
        type_ext = ".html";
        break;
      case "application/json":
        type_ext = ".json";
        break;
      case "image/png":
        type_ext = ".png";
        break;
      case "image/jpg":
        type_ext = ".jpg";
        break;
      case "image/webp":
        type_ext = ".webp";
        break;
      case "image/gif":
        type_ext = ".gif";
        break;
      default:
        break;
    }
    const res = await fetch(`${apiUrl}/v1/fragments?${id}${type_ext}`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Convert user fragments data', { data });
  } catch (err) {
    console.error('Unable to call GET to convert /v1/fragment', { err });
  }
}