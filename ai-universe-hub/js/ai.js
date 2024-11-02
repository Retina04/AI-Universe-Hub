/** @format */

// data sorting section start
// empty array 
let arrayByDateWise;


const sortDate = (array) => {
//assigning array value 
  arrayByDateWise = [...array];
  
  // sort by data 
	arrayByDateWise.sort((a, b) => {
		return (
			new Date(a.published_in).getTime() -
			new Date(b.published_in).getTime()
		);
	});
};

// slice data 
let dataSlice = true;


// call display function after sorting btn click 

document.getElementById("date-sort").addEventListener("click", function () {
  // console.log(arrayByDateWise);
	displayFeatures(arrayByDateWise, dataSlice);
  
});

// data sorting section end



const loadFeatures = dataLimit => {
	const url = `https://openapi.programming-hero.com/api/ai/tools`;
	fetch(url)
		.then(res => res.json())
		.then(feature => {
			displayFeatures(feature.data.tools, dataLimit);
		});

	toggleSpinner(true);
};

const displayFeatures = (data, dataLimit) => {
	const featuresContainer = document.getElementById("features_container");
	featuresContainer.innerText = "";
  const showAll = document.getElementById("show-all");
  
  sortDate(data);

  if (data.length > 6 && dataLimit) {
    
		data = data.slice(0, 6);
		showAll.classList.remove("d-none");
	} else {
		showAll.classList.add("d-none");
	}



	data.forEach(tool => {
		
		const featureDiv = document.createElement("div");
		featureDiv.classList.add("col");
	

		featureDiv.innerHTML = `
        <div class="card h-100  ">
                    <img class="  m-3 rounded-top "  src="${tool.image}" class="card-img-top " alt="...">
            <div class="card-body">
                    <h4>Features</h4>
                  <ol>
                  
                    <li class="${tool.features[0] === undefined ? "d-none" : ""}" > ${tool.features[0]}</li>
                    <li class="${tool.features[1] === undefined ? "d-none" : ""}" > ${tool.features[1]}</li>
                    <li class="${tool.features[2] === undefined ? "d-none" : ""}" > ${tool.features[2]}</li>
                    <li class="${tool.features[3] === undefined ? "d-none" : ""}" > ${tool.features[3]}</li>
                    <li class="${tool.features[4] === undefined ? "d-none" : ""}" > ${tool.features[4]}</li>
                    <li class="${tool.features[5] === undefined ? "d-none" : ""}" > ${tool.features[5]}</li>
                    
                  </ol>
                                                
            </div>
                  
                      
                    
                    
            <div class="card-footer d-flex  justify-content-between">
                    <div class="flex-column">
                      <div>
                        <h5>${tool.name}</h5>
                      </div>
                      <div class="d-flex">
                      <i class="fa fa-light fa-calendar-days me-2 mt-1 "></i>
                      <p>${tool.published_in}</p>
                      </div>
                    
                      </div>
                      <div> 
                       
                      <button type="button" class="rounded-circle btn btn-danger opacity-75 mt-3" onClick="fetchModalDetails('${tool.id}')"  data-bs-toggle="modal" data-bs-target="#featureDetailModal">
                      <i class="fa-solid fa-arrow-right"></i></button>
                       
                       
                    
                    </div>
              
            </div>
                    
                  
        </div>
        `;

		featuresContainer.appendChild(featureDiv);
	});

	toggleSpinner(false);
};
// loader
const toggleSpinner = isLoading => {
	const loaderSection = document.getElementById("loader");
	if (isLoading) {
		loaderSection.classList.remove("d-none");
	} else {
		loaderSection.classList.add("d-none");
	}
};
// show all button
document.getElementById("btn-show-all").addEventListener("click", function () {
   dataSlice = false;  
	loadFeatures();
});


//  data fetching for modal
const fetchModalDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    ;
    fetch(url)
      .then((res) => res.json())
      .then((data) => showModalDetails(data.data));
  };
 
const showModalDetails = (data) => {
  
  const { description, features, pricing, integrations, image_link, input_output_examples, accuracy } = data;
  const modalContainer = document.getElementById("feature-details");
  modalContainer.innerHTML = `
  <div class="row">
  <div class="col-sm-6 mb-3 mb-sm-0">
    <div class="card  ">
      <div class="card-body bg-danger-subtle rounded">
        <h5 class="card-title mb-3">${description}</h5>
        
        <div class="d-lg-flex justify-content-between gap-2 mx-2">
          <div class="p-2 bg-white rounded fw-semibold text-success text-center border border-danger-subtle border-2 rounded">
            <p >${pricing ? pricing[0].price : 'Free Of Cost/'}</p>
            <p  >${pricing ? pricing[0].plan : 'Basic'}</p>
          </div>
          <div class="p-2 bg-white rounded fw-semibold text-warning text-center border border-danger-subtle border-2 rounded">
            <p >${pricing ? pricing[1].price : 'Free of Cost/'}</p>
            <p >${pricing ? pricing[1].plan : 'Pro'}</p>
          </div>
          <div class="p-2 bg-white rounded fw-semibold text-danger text-center border border-danger-subtle border-2 rounded">
            <p >${pricing ? pricing[2].price : 'Free of Cost/'}</p>
            <p >${pricing ? pricing[2].plan : 'Enterprise'}</p>
          </div>

        </div>
        <div class="d-lg-flex gap-3 justify-content-between   mt-3">
          <div>
            <h5>Features</h5>
            <ul>
            
              <li class="${features['1'].feature_name === undefined ? d-none : ''}" >${features['1'].feature_name}</li>
              <li class="${features['2'].feature_name === undefined ? d-none : ''}" >${features['2'].feature_name}</li>
             <li class="${features['3'].feature_name === undefined} ? d-none : ''}" >${features['3'].feature_name}</li>
                                    
            </ul>
          </div>
          <div>
            <h5>Integrations</h5>
            <div>
                      
              <ul>
                  ${integrations?.length ? integrations.map((name) =>`<li>${name}</li>`).join(''):'No Data Found'}
              </ul >                          
                                                                                             
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div class="col-sm-6">
    <div class="card">
      <img class="rounded m-4" src="${image_link ? image_link[0] : image_link[1]}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title mx-3">${input_output_examples ? input_output_examples[1].input : 'Can you give any example?'}</h5>
        <div class="card-text">
          <p class ="px-5">${input_output_examples ? input_output_examples[1].output : 'Please,come again.Thankyou'}</p>
        </div>
      </div>
      <span class="badge text-bg-danger position-absolute end-0 top-0 m-5">${accuracy.score > 0 ? accuracy.score * 100 + '% accuracy' : ''}</span>
    </div>
  </div>
</div>
`;
};
 

loadFeatures(6);
