export function getValueFromCookie(input, key) {
  // Split the string into key-value pairs using semicolon as the separator
  const pairs = input.split(";");

  // Loop through each pair
  for (let pair of pairs) {
    // Trim any whitespace and then split the pair into key and value
    pair = pair.trim();
    const [currentKey, value] = pair.split("=");

    // If the current key matches the provided key, return the value
    if (currentKey === key) {
      return value;
    }
  }

  // Return null if the key is not found
  return null;
}

export function deleteCookie(cookieName) {
  // Set the cookie with the same name and an expiry date in the past
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function deleteJTICookie() {
        // Set the cookie with the same name and an expiry date in the past
        document.cookie = `jti=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `given_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `family_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}


