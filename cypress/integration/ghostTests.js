/// <reference types="cypress" />

context('Actions', () => {
  before(() => {
    cy.visit('http://localhost:2368/ghost')
    login();
    createPost(textTest);
    cleanPosts()
    createPage()
    cleanPages()
    logout();
  })

  beforeEach(() => {
    cy.visit('http://localhost:2368/ghost');
    login();
    //Verify to be into the site
    cy.get('section').should('have.class', mainLoggedScreenClass);
  })

  // Data
  const userName = 'test@test.com';
  const userPassword = 'test123456';
  const textTest = 'Post creation test';
  const textTest2 = 'post content';
  const textTest3 = 'Page creation test';
  const textTest4 = 'Page content';
  
  // Login
  const inputEmail = '[type="email"]';
  const inputPassword = '[type="password"]';
  const btnLogin = '#login';

  // Post
  const btnSectionPost = '[href="#/posts/"]';
  const btnNewPost = 'a[href="#/editor/post/"]';
  const titlePost = 'textarea';
  const textPost = 'div[data-kg="editor"]';
  const btnPublishPost = 'header .ember-basic-dropdown-trigger';
  const btnModalPublishPost = 'footer button.gh-publishmenu-button';
  const btnModalPublishSurePost = '.modal-footer button.ember-view';
  const btnModalPublishDeleteSurePost = '.modal-footer button.ember-view';
  const btnBackPost = '.ember-view.gh-editor-back-button';
  const listItemPost = '.gh-posts-list-item';
  const listItemStatusPost = `${listItemPost} .gh-post-list-status`;
  const btnActions = 'main button.settings-menu-toggle';
  const btnActionsDelete = '.settings-menu-container .settings-menu-delete-button';
  const inputScheduleTime = '.gh-date-time-picker-time';
  const msjError = '.gh-date-time-picker-error';
  const radioScheduleOption = '.gh-publishmenu-radio-content';
  const filtersList = '.gh-contentfilter-menu.gh-contentfilter-type';
  const statusList = '.ember-power-select-option';
  const postsList = '.posts-list.gh-list';

  //Page
  const btnSectionPage = '[href="#/pages/"]';
  //const btnNewPage = '[href="#/editor/page/"]';
  const btnNewPage = '.ember-view.gh-btn.gh-btn-primary.view-actions-top-row';
  const titlePage = 'textarea';
  const textPage = 'div[data-kg="editor"]';
  const btnPublishPage = 'header .ember-basic-dropdown-trigger';
  const btnModalPublishPage = 'footer button.gh-publishmenu-button';
  const btnModalPublishSurePage = '.modal-footer button.ember-view';
  const listItemPage = '.gh-posts-list-item';
  const listItemStatusPage = `${listItemPage} .gh-post-list-status`;
  const btnBackPage = '.ember-view.gh-editor-back-button';

  // Members
  const btnSectionMembers = '[href="#/members/"]';
  const btnNewMember = '[href="#/members/new/"]';
  const inputName = '[name="name"]';
  const btnSave = 'main button.ember-view';
  const memberRow = '.members-list-container-stretch table tr';
  const msjErrorEmail = 'div.error .response';
  const memberData = '.ember-view.gh-list-data';
  const divMembersEmpty = '.gh-members-empty';
  const btnSettingMember = 'button.gh-btn-action-icon';
  const btnDeleteMember = '.dropdown .red';
  const emailTest = 'emailTest@email.com'

  // Settings
  const btnUserSettings = 'section .ember-view.ember-basic-dropdown-trigger.pointer';
  const btnSignOut = 'li .user-menu-signout';

  // Others
  const mainLoggedScreenClass = 'gh-nav-body';
  const settings = '[href="#/settings/"]';
  const navigation = '[href="#/settings/navigation/"]';
  const saveButton = '.view-actions button';
  const site = '[href="#/site/"]';
  const burger = 'ul.nav li';

  const login = () => {
    //Log into the site  
    cy.get(inputEmail).type(userName)
    cy.get(inputPassword).type(userPassword)
    cy.get(btnLogin).submit()
    cy.wait(1000)
  }

  const logout = () => {
    cy.get(btnUserSettings).click();
    cy.get(btnSignOut).click();
  }

  const createPost = (text = textTest) => {
    //Create post
    cy.get(btnNewPost).first().click()
    cy.get(titlePost).type(text)
    cy.get(textPost).first().focus()
    cy.wait(3000)
  }

  const deletePost = (id = 0) => {
    cy.get(listItemPost).eq(id).click()
    cy.get(btnActions).click()
    cy.get(btnActionsDelete).click()
    cy.get(btnModalPublishDeleteSurePost).click()
  }

  const cleanPosts = () => {
    cy.get(btnSectionPost).first().click();
    cy.get(listItemPost).then($item => {
      for (let index = 0; index < $item.length; index++) {
        deletePost();
      }
    })
  }

  const createPage = (text = textTest3) => {
    //Create post
    cy.get(btnSectionPage).first().click();
    cy.get(btnNewPage).first().click()
    cy.get(titlePage).type(text)
    cy.get(textPage).first().focus()
    cy.wait(3000)
  }

  const deletePage = (id = 0) => {
    cy.get(listItemPage).eq(id).click()
    cy.get(btnActions).click()
    cy.get(btnActionsDelete).click()
    cy.get(btnModalPublishDeleteSurePost).click()
  }

  const cleanPages = () => {
    cy.get(btnSectionPage).first().click();
    cy.get(listItemPage).then($item => {
      for (let index = 0; index < $item.length; index++) {
        deletePage();
      }
    })
  }

  const createMember = (email = emailTest) => {
    cy.get(btnSectionMembers).first().click();
    cy.get(btnNewMember).eq(0).click();
    if (email.length) {
      cy.get('#member-email').type(email);
    }
    cy.get(btnSave).click();
    cy.wait(1000)
  }

  const deleteMember = () => {
    cy.get(memberData).first().click();
    cy.get(btnSettingMember).click();
    cy.get(btnDeleteMember).click();
    cy.get(btnModalPublishDeleteSurePost).first().click();
  }

  //1
  it('login, crear post, revisar lista post, revisar publicado', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates a post and publishes it
    createPost();

    //Publish post
    cy.get(btnPublishPost).click()
    cy.get(btnModalPublishPost).click()
    cy.get(btnModalPublishDeleteSurePost).click()
    cy.wait(1000)

    //Go back to posts list
    cy.get(btnBackPost).eq(0).click()

    // THEN: the published post exists
    //Verify published post
    cy.get(listItemPost).first().should('contain', textTest)
    cy.get(listItemStatusPost).first().should('contain', 'Published')
  })

  //2
  it('login, crear post en draft, revisar lista post guardado como draft', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates a post as draft
    createPost();

    //Go back to posts list
    cy.get(btnBackPost).eq(0).click()

    // THEN: The post exists and has draft status
    //Verify draft post in list 
    cy.get(listItemPost).first().should('contain', textTest)
    cy.get(listItemStatusPost).first().should('contain', 'Draft')

  })

  //3
  it('login, crear post, revisar lista post, revisar publicado, modificar post, publicado con el cambio', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates and modify a post
    createPost();

    //Publish post
    cy.get(btnPublishPost).click()
    cy.get(btnModalPublishPost).click()
    cy.get(btnModalPublishDeleteSurePost).click()
    cy.wait(1000)

    //Go back to posts list
    cy.get(btnBackPost).eq(0).click()

    //Verify published post
    cy.get(listItemPost).eq(1).should('contain', textTest)
    cy.get(listItemStatusPost).eq(1).should('contain', 'Published')

    //Modify post
    cy.get(listItemPost).eq(1).click()
    cy.get(textPost).click()
    cy.get(textPost).first().type(textTest2)

    // //Update post
    cy.get(btnPublishPost).click()
    cy.get(btnModalPublishPost).click()
    // cy.get(btnModalPublishDeleteSurePost).click()
    cy.wait(2000)

    //Go back to posts list
    cy.get(cy.get(btnBackPost).eq(0).click())

    // THEN: The post exists
    //Review published post
    cy.get(listItemPost).eq(1).should('contain', textTest)
    cy.get(listItemStatusPost).eq(1).should('contain', 'Published')

    //Review changes in published post
    cy.get(listItemPost).eq(1).click()
    cy.get('.koenig-editor__editor.__mobiledoc-editor').should('contain', textTest2)
  })  

  //4
  it('login, crear post, revisar lista post, revisar publicado, eliminar post, publicado con el cambio', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates and deletes a post
    createPost(textTest2);

    //Publish post
    cy.get(btnPublishPost).click()
    cy.get(btnModalPublishPost).click()
    cy.get(btnModalPublishDeleteSurePost).click()
    cy.wait(1000)

    //Go back to posts list
    cy.get(btnBackPost).eq(0).click()

    //Verify published post
    cy.get(listItemPost).eq(1).should('contain', textTest2)
    cy.get(listItemStatusPost).eq(1).should('contain', 'Published')

    //Delete post
    deletePost(1)

    // THEN: The post doesn't exist
    //Review published post
    cy.get(listItemPost).should('have.length', 3)
  })

  //5
  it('login, crear post, setear scheduele post con hora erronea, que aparezca  error', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates and schedule a post with wrong time
    createPost();

    // THEN: Displayed error
    //Schedule publish post
    cy.get(btnPublishPost).click()
    cy.get(inputScheduleTime).clear()
    cy.get(btnModalPublishPost).click()
    cy.get(msjError).should('contain', 'Must be in format: "15:00"')

  })

  //6
  it('login, crear post, setear scheduele post, verificar post en listado', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates and schedule a post correctly
    createPost();

    //Schedule publish post
    cy.get(btnPublishPost).click()
    cy.get(radioScheduleOption).eq(1).click()
    cy.get(btnModalPublishPost).click()
    cy.get(btnModalPublishDeleteSurePost).click()

    //Go back to post list
    cy.get(btnBackPost).eq(0).click()

    //THEN: The post is scheduled
    //Verify published post
    cy.get(listItemPost).first().should('contain', textTest)
    cy.get(listItemStatusPost).first().should('contain', 'Scheduled')

  })

  //7
  it('login, crear post, revisar lista post, filtrar por publicado, verificar en lista.', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates a post and review the published posts by filter

    //Create post  
    createPost();

    //Publish post
    cy.get(btnPublishPost).click()
    cy.get(btnModalPublishPost).click()
    cy.get(btnModalPublishSurePost).click()
    cy.wait(1000)

    //Go back to posts list
    cy.get(btnBackPost).eq(0).click()
    cy.wait(2000)

    //THEN: the post created is published
    //Filter by published posts
    cy.get(filtersList).first().click()
    cy.get(statusList).eq(2).click()

    //Verify published post
    cy.get(listItemPost).first().should('contain', textTest)
    cy.get(listItemStatusPost).first().should('contain', 'Published')

  })

  //8
  it('login, crear post, revisar lista post, revisar publicado, modificar post a unpublised, filtrar por draft posts, verificar post', () => {
    
      //GIVEN: a user visited 'http://localhost:2368/ghost' and login
      //WHEN: the user creates a post, publish the post, modify it to unpublished

      //Create post  
      createPost();

      //Publish post
      cy.get(btnPublishPost).click()
      cy.get(btnModalPublishPost).click()
      cy.get(btnModalPublishSurePost).click()
      cy.wait(1000)

      //Go back to posts list
      cy.get(btnBackPost).eq(0).click()
      cy.wait(2000)

      //Filter by published
      cy.get(filtersList).first().click()
      cy.get(statusList).eq(2).click()

      //Verify published post
      cy.get(listItemPost).first().should('contain', textTest)
      cy.get(listItemStatusPost).first().should('contain', 'Published')
      
      //Modify post to unpublished
      cy.get(listItemPost).first().click()
      cy.get('.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-editor.gh-publishmenu-trigger').click()
      cy.get('.gh-publishmenu-radio-button').eq(0).click()
      cy.get('.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click()
      cy.wait(3000)
      cy.get(textPost).click()

      //Go back to posts list
      cy.get(btnBackPost).eq(0).click()
      cy.wait(2000)

      //THEN: the post has to be in draft posts
      //Filter by draft posts
      cy.get(filtersList).first().click()
      cy.get(statusList).eq(1).click()

      //Review draft post
      cy.get(listItemPost).first().should('contain', textTest)
      cy.get(listItemStatusPost).first().should('contain', 'Draft')

  })

  //9
  it('login, crear page, revisar lista pages, revisar publicado', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates a page and publishes it
    createPage();

    //Publish page
    cy.get(btnPublishPage).click()
    cy.get(btnModalPublishPage).click()
    cy.wait(1000)

    //Go back to posts list
    cy.get(btnBackPage).click()

    // THEN: the published page exists
    //Verify published page
    cy.get(listItemPage).first().should('contain', textTest3)
    cy.get(listItemStatusPage).first().should('contain', 'Published')
  })

  //10
  it('login, crear page en draft, revisar lista page guardado como draft', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates a page as draft
    createPage();

    //Go back to pages list
    cy.get(btnBackPage).click()

    // THEN: The page exists and has draft status
    //Verify draft post in list 
    cy.get(listItemPage).first().should('contain', textTest3)
    cy.get(listItemStatusPage).first().should('contain', 'Draft')

  })

  //11
  it('login, crear page, revisar lista page, revisar publicada, modificar page, publicada con el cambio', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates, publish and modify a page
    createPage();

    //Publish page
    cy.get(btnPublishPage).click()
    cy.get(btnModalPublishPage).click()
    cy.wait(1000)

    //Go back to page list
    cy.get(btnBackPage).click()

    //Verify published page
    cy.get(listItemPage).eq(1).should('contain', textTest3)
    cy.get(listItemStatusPage).eq(1).should('contain', 'Published')

    //Modify page
    cy.get(listItemPage).eq(1).click()
    cy.get(textPage).click()
    cy.get(textPage).first().type(textTest4)

    // //Update page
    cy.get(btnPublishPage).click()
    cy.get(btnModalPublishPage).click()
    cy.wait(2000)

    //Go back to pages list
    cy.get(cy.get(btnBackPage).click())

    // THEN: The page exists
    //Review published page
    cy.get(listItemPage).eq(1).should('contain', textTest3)
    cy.get(listItemStatusPage).eq(1).should('contain', 'Published')

    //Review changes in published page
    cy.get(listItemPage).eq(1).click()
    cy.get('.koenig-editor__editor.__mobiledoc-editor').should('contain', textTest4)
  }) 

  //12
  it('login, crear page, revisar lista page, revisar publicada, eliminar page, publicada con el cambio', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates and deletes a page
    createPage();

    //Publish page
    cy.get(btnPublishPage).click()
    cy.get(btnModalPublishPage).click()
    cy.wait(1000)

    //Go back to pages list
    cy.get(btnBackPage).click()

    //Verify published page
    cy.get(listItemPage).eq(1).should('contain', textTest3)
    cy.get(listItemStatusPage).eq(1).should('contain', 'Published')

    //Delete page
    deletePage(1)

    // THEN: The page doesn't exist
    //Review published post
    cy.get(listItemPage).should('have.length', 3)
  })  

  //13
  it('login, crear page, setear scheduele page con hora erronea, que aparezca  error', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates and schedule a page with wrong time
    createPage();

    // THEN: Displayed error
    //Schedule publish page
    cy.get(btnPublishPage).click()
    cy.get(inputScheduleTime).clear()
    cy.get(btnModalPublishPage).click()
    cy.get(msjError).should('contain', 'Must be in format: "15:00"')

  })

  //14
  it('login, crear page, setear scheduele page, verificar page en listado', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates and schedule a page correctly
    createPage();

    //Schedule publish page
    cy.get(btnPublishPage).click()
    cy.get(radioScheduleOption).eq(1).click()
    cy.get(btnModalPublishPage).click()

    //Go back to page list
    cy.get(btnBackPage).click()

    //THEN: The page is scheduled
    //Verify published page
    cy.get(listItemPage).first().should('contain', textTest3)
    cy.get(listItemStatusPage).first().should('contain', 'Scheduled')

  })  

  //15
  it('login, crear page, revisar lista page, filtrar por publicado, verificar en lista.', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates a page and review the published pages by filter

    //Create page  
    createPage();

    //Publish page
    cy.get(btnPublishPage).click()
    cy.get(btnModalPublishPage).click()
    cy.wait(1000)

    //Go back to pages list
    cy.get(btnBackPage).click()
    cy.wait(2000)

    //THEN: the page created is published
    //Filter by published pages
    cy.get(filtersList).first().click()
    cy.get(statusList).eq(2).click()

    //Verify published post
    cy.get(listItemPage).first().should('contain', textTest3)
    cy.get(listItemStatusPage).first().should('contain', 'Published')

  })

  //16
  it('login, crear page, revisar lista page, revisar publicado, modificar page a unpublised, filtrar por draft pages, verificar page', () => {
    
    //GIVEN: a user visited 'http://localhost:2368/ghost' and login
    //WHEN: the user creates a page, publish the page, modify it to unpublished

    //Create page  
    createPage();

    //Publish page
    cy.get(btnPublishPage).click()
    cy.get(btnModalPublishPage).click()
    cy.wait(1000)

    //Go back to pages list
    cy.get(btnBackPage).click()
    cy.wait(2000)

    //Filter by published
    cy.get(filtersList).first().click()
    cy.get(statusList).eq(2).click()

    //Verify published page
    cy.get(listItemPage).first().should('contain', textTest3)
    cy.get(listItemStatusPage).first().should('contain', 'Published')
    
    //Modify page to unpublished
    cy.get(listItemPage).first().click()
    cy.get('.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-editor.gh-publishmenu-trigger').click()
    cy.get('.gh-publishmenu-content.gh-publishmenu-section').first().click();
    cy.get('.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click()
    cy.wait(2000)

    //Go back to pages list
    cy.get(btnBackPage).click()
    cy.wait(2000)

    //THEN: the post has to be in draft posts
    //Filter by draft posts
    cy.get(filtersList).first().click()
    cy.get(statusList).eq(1).click()

    //Review draft post
    cy.get(listItemPage).first().should('contain', textTest3)
    cy.get(listItemStatusPage).first().should('contain', 'Draft')

})

  //17
  it('login, members, new member, verificar que este en la lista de members', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates a new member
    createMember();

    //THEN: The member is displayed in the member's list
    cy.get(btnSectionMembers).first().click();
    cy.wait(2000)
    cy.get(memberData).first().should('contain', emailTest);
  })

  //18
  it('login, members, delete member, verificar que no este en la lista de members', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user deletes a member
    cy.get(btnSectionMembers).first().click();
    deleteMember();

    //THEN: The member is not displayed in the member's list
    cy.wait(1000)
    cy.get(btnSectionMembers).first().click();
    cy.get(divMembersEmpty).should('contain', 'Start building your audience');
  })

  //19
  it('login, members, new member, verificar que aparece error por correo invalido', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates a new member with empty email
    createMember('');

    //THEN: It is displayed button retry and show message error
    cy.get(btnSave).should('contain', 'Retry');
    cy.get(msjErrorEmail).should('contain', 'Please enter an email.');
  })

  //20
  it('login, ir a config, navigate, intentar crear un navigate item sin nombre, verificar que genere error', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user change navigate config in settings
    cy.get(settings).first().click()
    cy.get(navigation).first().click()
    cy.get('.gh-blognav-add').eq(0).click()
    cy.get(saveButton).click()

    //THEN: The navigation item has to be changed
    cy.get('.response').should('contain', 'You must specify a label')
    logout()
  })

})

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
