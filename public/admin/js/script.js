// Button Status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if (status) url.searchParams.set("status", status);
            else url.searchParams.delete("status");
            window.location.href = url.href;
            button.setAttribute("active");
        });
    });
}

// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
    let url = new URL(window.location.href);
    buttonsPagination.forEach((button) => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        });
    });
}

//Checkbox
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputsId.forEach((input) => {
                input.checked = true;
            });
        } else {
            inputsId.forEach((input) => {
                input.checked = false;
            });
        }
    });

    inputsId.forEach((input) => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll(
                "input[name='id']:checked"
            ).length;
            if (countChecked == inputsId.length) inputCheckAll.checked = true;
            else inputCheckAll.checked = false;
        });
    });
}
//End checkbox
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll(
            "input[name='id']:checked"
        );
        console.log(inputsChecked);

        const typeChange = e.target.elements.type.value;
        if (typeChange == "delete-all") {
            const isConfirm = confirm("Do you want delete this product?");
            if (!isConfirm) return;
        }

        if (inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            console.log(2);
            inputsChecked.forEach((input) => {
                const id = input.value;
                if (typeChange == "change-position") {
                    const position = input
                        .closest("tr")
                        .querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);
                }
                else ids.push(id);
            });

            console.log(2);
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        } else {
            alert("Please select at least one product");
        }
    });
}

//Show alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);

    closeAlert.addEventListener("click" , () => {
        showAlert.classList.add("alert-hidden");
    });
}
