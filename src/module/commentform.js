const popup = document.querySelector('.popup-dialog');
const formContainer = document.createElement('form');
formContainer.className = 'form';

const createFormContainer = (id) => {
  formContainer.innerHTML = `
            <h2 class="title">Add Comment</h2>
          <label>  <input type="text" name="name" required placeholder="Your name" class="your-name" id="your-name"> <span class='empty-name'> * Required</span> </label>
         <label>   <textarea name="message" class="message" required placeholder="Your Insight" id="message" cols="30" rows="10"></textarea> <span class='empty-comment'> * Required</spa></label>
          <button type="submit" data-id='${id}' class="add-comment">Comment</button>
       `;

  popup.appendChild(formContainer);
};

export default createFormContainer;