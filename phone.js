const loadPhone = async (searchText , isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones,isShowAll);
};

const displayPhones = (phones , isShowAll) => {
    // step 1 
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container 
    phoneContainer.textContent = '';

    //display show all button condition here
    const showAllButton = document.getElementById('show-all-container');
    if(phones.length>12 && isShowAll!=true)
    {
        showAllButton.classList.remove('hidden');
    }
    else
    {
        showAllButton.classList.add('hidden');
    }
    
    // display first 8 phones if showall is false
    if(isShowAll!=true)
    {
      phones = phones.slice(0, 12);
    }

  phones.forEach((phone) => {
    // console.log(phone);

    // step 2
    const phoneCard = document.createElement("div");
    // step 3 
    phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick = "showDetails('${phone.slug}')"  class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
    `;
        // step 4 
        phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
}

// show details 
const showDetails = async (slug) =>
{
  // console.log(slug);
  // single phone data 
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
  const data = await res.json();
  console.log(data.data);
}

// handle search button 
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText , isShowAll);
}

const toggleLoadingSpinner = (isLoading) =>
{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading===true)
    {
      loadingSpinner.classList.remove('hidden');
    }
    else
    {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all 

const handleShowAll = () =>
{
  handleSearch(true);
}

// loadPhone();
