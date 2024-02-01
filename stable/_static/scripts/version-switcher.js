/**
 * Adds the link to available documentation page as the last entry in the version
 * switcher dropdown. Since other entries in the dropdown are also added dynamically,
 * we only add the link when the user clicks on some version switcher button to make
 * sure that this entry is the last one.
 */

function addVersionSwitcherAvailDocsLink() {
  var availDocsLinkAdded = false;

  // There can be multiple version switcher buttons because there is at least one for
  // laptop size and one for mobile size (in the sidebar)
  document
    .querySelectorAll(".version-switcher__button")
    .forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!availDocsLinkAdded) {
          // All version switcher dropdowns are updated once any button is clicked
          document
            .querySelectorAll(".version-switcher__menu")
            .forEach(function (menu) {
              var availDocsLink = document.createElement("a");
              availDocsLink.setAttribute(
                "href",
                "https://scikit-learn.org/dev/versions.html"
              );
              availDocsLink.innerHTML = "More";
              // We use the same class as the last entry to be safe
              availDocsLink.className = menu.lastChild.className;
              availDocsLink.classList.add("sk-avail-docs-link");
              menu.appendChild(availDocsLink);
            });
          // Set the flag so we do not add again
          availDocsLinkAdded = true;
        }
      });
    });
}

document.addEventListener("DOMContentLoaded", addVersionSwitcherAvailDocsLink);

/**
 * Adds the version warning banner to the top of the page. This relies on the version
 * switcher JSON file used by pydata-sphinx-theme, being available at the URL specified
 * by `DOCUMENTATION_OPTIONS.theme_switcher_json_url`.
 */

async function addVersionWarningBanner() {
  try {
    const version = DOCUMENTATION_OPTIONS.VERSION;

    // Fetch the version switcher JSON file and get the current entry; see
    // https://pydata-sphinx-theme.readthedocs.io/en/stable/user_guide/version-dropdown.html
    const response = await fetch(DOCUMENTATION_OPTIONS.theme_switcher_json_url);
    const versionList = await response.json();
    const currentEntry = versionList.find((item) => item.version === version);
    if (currentEntry.name.includes("stable")) {
      return;
    }

    // Get the latest stable and dev entries to be used in messages
    const stableEntry = versionList.find((item) => item.preferred);
    const devEntry = versionList.find((item) => item.version.includes("dev"));

    // The banner div, using the same class as the pydata-sphinx-theme version warning
    // banner, so that it can be styled in the same way
    var versionWarningBanner = document.createElement("div");
    versionWarningBanner.className =
      "bd-header-version-warning container-fluid";

    // The banner has flex display, so we need to wrap the message in a div
    var bannerContainer = document.createElement("div");
    if (currentEntry.name.includes("dev")) {
      bannerContainer.innerHTML = `This is documentation for the <strong>unstable development version</strong> of scikit-learn. To use it, <a href="https://scikit-learn.org/dev/developers/advanced_installation.html#installing-nightly-builds">install the nightly build</a>. The latest stable release is <a href="${stableEntry.url}">version ${stableEntry.version}</a>.`;
    } else {
      bannerContainer.innerHTML = `This is documentation for an <strong>old release</strong> of scikit-learn (version ${version}). Try the <a href="${stableEntry.url}">latest stable release</a> (version ${stableEntry.version}) or the <a href="${devEntry.url}">unstable development version</a>.`;
    }

    // Insert the banner into the top of the body
    versionWarningBanner.appendChild(bannerContainer);
    document.body.prepend(versionWarningBanner);
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", addVersionWarningBanner);
