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
  const userName = 'usuario@ghost.com';
  const userPassword = 'Usuario1234567;
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
  const btnBackPost = '.blue.link.fw4.flex.items-center.ember-view';
  const listItemPost = '.gh-posts-list-item';
  const listItemStatusPost = `${listItemPost} .gh-post-list-status`;
  const btnActions = '.post-settings';
  const btnActionsDelete = '.settings-menu-container .settings-menu-delete-button';
  const inputScheduleTime = '.gh-date-time-picker-time';
  const msjError = '.gh-date-time-picker-error';
  const radioScheduleOption = '.gh-publishmenu-radio-content';
  const filtersList = '.gh-contentfilter-menu.gh-contentfilter-type';
  const statusList = '.ember-power-select-option';
  const postsList = '.posts-list.gh-list';

  //Page
  const btnSectionPage = '[href="#/pages/"]';
  const btnNewPage = '[href="#/editor/page/"]';
  //const btnNewPage = '.ember-view.gh-btn.gh-btn-primary.view-actions-top-row';
  const titlePage = 'textarea';
  const textPage = 'div[data-kg="editor"]';
  const btnPublishPage = 'header .ember-basic-dropdown-trigger';
  const btnModalPublishPage = 'footer button.gh-publishmenu-button';
  const btnModalPublishSurePage = '.modal-footer button.ember-view';
  const listItemPage = '.gh-posts-list-item';
  const listItemStatusPage = `${listItemPage} .gh-post-list-status`;
  const btnBackPage = '.blue.link.fw4.flex.items-center.ember-view';

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
  const design = '[href="#/settings/design/"]'

  const login = () => {
    //Log into the site  
    cy.screenshot()
    cy.get(inputEmail).type(userName)
    cy.get(inputPassword).type(userPassword)
    cy.get(btnLogin).submit()
    cy.screenshot()
    cy.wait(1000)
  }

  const logout = () => {
    cy.get(btnUserSettings).click();
    cy.get(btnSignOut).click();
  }

  const createPost = (text = textTest) => {
    //Create post
    cy.get(btnNewPost).first().click()
    cy.get(titlePost).first().type(text)
    cy.get(textPost).first().focus()
    cy.wait(3000)
  }

  const deletePost = (id = 0) => {
    cy.get(listItemPost).eq(id).click()
    cy.get(btnActions).click()
    cy.get(btnActionsDelete).click()
    cy.get(btnModalPublishDeleteSurePost).first().click()
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
    cy.get(titlePage).first().type(text)
    cy.get(textPage).first().focus()
    cy.wait(3000)
  }

  const deletePage = (id = 0) => {
    cy.get(listItemPage).eq(id).click()
    cy.get(btnActions).click()
    cy.get(btnActionsDelete).click()
    cy.get(btnModalPublishDeleteSurePost).first().click()
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
    cy.screenshot()

    //Publish post
    cy.get(btnPublishPost).click()
    cy.screenshot()
    cy.get(btnModalPublishPost).click()
    cy.screenshot()
    //cy.get(btnModalPublishDeleteSurePost).click()
    //cy.screenshot()
    cy.wait(1000)

    //Go back to posts list
    cy.get(btnBackPost).eq(0).click()
    cy.screenshot()

    // THEN: the published post exists
    //Verify published post
    cy.get(listItemPost).first().should('contain', textTest)
    cy.screenshot()
    cy.get(listItemStatusPost).first().should('contain', 'Published')
    cy.screenshot()
  })

  //2
  it('login, crear post en draft, revisar lista post guardado como draft', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates a post as draft
    createPost();
    cy.screenshot()

    //Go back to posts list
    cy.get(btnBackPost).eq(0).click()
    cy.screenshot()

    // THEN: The post exists and has draft status
    //Verify draft post in list 
    cy.get(listItemPost).first().should('contain', textTest)
    cy.screenshot()
    cy.get(listItemStatusPost).first().should('contain', 'Draft')
    cy.screenshot()
  })

  //3
  it('login, crear post, revisar lista post, revisar publicado, modificar post, publicado con el cambio', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates and modify a post
    createPost();
    cy.screenshot()

    //Publish post
    cy.get(btnPublishPost).click()
    cy.screenshot()
    cy.get(btnModalPublishPost).click()
    cy.screenshot()
    //cy.get(btnModalPublishDeleteSurePost).click()
    //cy.screenshot()
    cy.wait(1000)

    //Go back to posts list
    cy.get(btnBackPost).eq(0).click()
    cy.screenshot()

    //Verify published post
    cy.get(listItemPost).eq(1).should('contain', textTest)
    cy.screenshot()
    cy.get(listItemStatusPost).eq(1).should('contain', 'Published')
    cy.screenshot()

    //Modify post
    cy.get(listItemPost).eq(1).click()
    cy.screenshot()
    cy.get(textPost).click()
    cy.screenshot()
    cy.get(textPost).first().type(textTest2)
    cy.screenshot()

    // //Update post
    cy.get(btnPublishPost).click()
    cy.screenshot()
    cy.get(btnModalPublishPost).click()
    cy.screenshot()
    // cy.get(btnModalPublishDeleteSurePost).click()
    cy.wait(2000)

    //Go back to posts list
    cy.get(cy.get(btnBackPost).eq(0).click())
    cy.screenshot()

    // THEN: The post exists
    //Review published post
    cy.get(listItemPost).eq(1).should('contain', textTest)
    cy.screenshot()
    cy.get(listItemStatusPost).eq(1).should('contain', 'Published')
    cy.screenshot()

    //Review changes in published post
    cy.get(listItemPost).eq(1).click()
    cy.screenshot()
    cy.get('.koenig-editor__editor.__mobiledoc-editor').should('contain', textTest2)
    cy.screenshot()
  })  

  //4
  it('login, crear post, revisar lista post, revisar publicado, eliminar post, publicado con el cambio', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates and deletes a post
    createPost(textTest2);
    cy.screenshot()

    //Publish post
    cy.get(btnPublishPost).click()
    cy.screenshot()
    cy.get(btnModalPublishPost).click()
    cy.screenshot()
    //cy.get(btnModalPublishDeleteSurePost).click()
    //cy.screenshot()
    cy.wait(1000)

    //Go back to posts list
    cy.get(btnBackPost).eq(0).click()
    cy.screenshot()

    //Verify published post
    cy.get(listItemPost).eq(1).should('contain', textTest2)
    cy.screenshot()
    cy.get(listItemStatusPost).eq(1).should('contain', 'Published')
    cy.screenshot()

    //Delete post
    deletePost(1)
    cy.screenshot()

    // THEN: The post doesn't exist
    //Review published post
    cy.get(listItemPost).should('have.length', 3)
    cy.screenshot()
  })

  //5
  it('login, crear post, setear scheduele post con hora erronea, que aparezca  error', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates and schedule a post with wrong time
    createPost();
    cy.screenshot()

    // THEN: Displayed error
    //Schedule publish post
    cy.get(btnPublishPost).click()
    cy.screenshot()
    cy.get(inputScheduleTime).first().clear()
    cy.screenshot()
    cy.get(btnModalPublishPost).click()
    cy.screenshot()
    cy.get(msjError).should('contain', 'Must be in format: "15:00"')
    cy.screenshot()
  })

  //6
  it('login, crear post, setear scheduele post, verificar post en listado', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates and schedule a post correctly
    createPost();
    cy.screenshot()

    //Schedule publish post
    cy.get(btnPublishPost).click()
    cy.screenshot()
    cy.get(radioScheduleOption).eq(1).click()
    cy.screenshot()
    cy.get(btnModalPublishPost).click()
    cy.screenshot()
    //cy.get(btnModalPublishDeleteSurePost).click()
    //cy.screenshot()

    //Go back to post list
    cy.get(btnBackPost).eq(0).click()
    cy.screenshot()

    //THEN: The post is scheduled
    //Verify published post
    cy.get(listItemPost).first().should('contain', textTest)
    cy.screenshot()
    cy.get(listItemStatusPost).first().should('contain', 'Scheduled')
    cy.screenshot()
  })

  //7
  it('login, crear post, revisar lista post, filtrar por publicado, verificar en lista.', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates a post and review the published posts by filter

    //Create post  
    createPost();
    cy.screenshot()

    //Publish post
    cy.get(btnPublishPost).click()
    cy.screenshot()
    cy.get(btnModalPublishPost).click()
    cy.screenshot()
    //cy.get(btnModalPublishSurePost).click()
    //cy.screenshot()
    cy.wait(1000)

    //Go back to posts list
    cy.get(btnBackPost).eq(0).click()
    cy.screenshot()
    cy.wait(2000)

    //THEN: the post created is published
    //Filter by published posts
    cy.get(filtersList).first().click()
    cy.screenshot()
    cy.get(statusList).eq(2).click()
    cy.screenshot()

    //Verify published post
    cy.get(listItemPost).first().should('contain', textTest)
    cy.screenshot()
    cy.get(listItemStatusPost).first().should('contain', 'Published')
    cy.screenshot()
  })

  //8
  it('login, crear post, revisar lista post, revisar publicado, modificar post a unpublised, filtrar por draft posts, verificar post', () => {
    
      //GIVEN: a user visited 'http://localhost:2368/ghost' and login
      //WHEN: the user creates a post, publish the post, modify it to unpublished

      //Create post  
      createPost();
      cy.screenshot()

      //Publish post
      cy.get(btnPublishPost).click()
      cy.screenshot()
      cy.get(btnModalPublishPost).click()
      cy.screenshot()
      //cy.get(btnModalPublishSurePost).click()
      //cy.screenshot()
      cy.wait(1000)

      //Go back to posts list
      cy.get(btnBackPost).eq(0).click()
      cy.screenshot()
      cy.wait(2000)

      //Filter by published
      cy.get(filtersList).first().click()
      cy.screenshot()
      cy.get(statusList).eq(2).click()
      cy.screenshot()

      //Verify published post
      cy.get(listItemPost).first().should('contain', textTest)
      cy.screenshot()
      cy.get(listItemStatusPost).first().should('contain', 'Published')
      cy.screenshot()
      
      //Modify post to unpublished
      cy.get(listItemPost).first().click()
      cy.screenshot()
      cy.get('.gh-publishmenu.ember-view').click()
      cy.screenshot()
      cy.get('.gh-publishmenu-radio-button').eq(0).click()
      cy.screenshot()
      //cy.get('.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click()
      cy.get(btnModalPublishPost).click()
      cy.screenshot()
      cy.wait(3000)
      cy.get(textPost).click()
      cy.screenshot()

      //Go back to posts list
      cy.get(btnBackPost).eq(0).click()
      cy.screenshot()
      cy.wait(2000)

      //THEN: the post has to be in draft posts
      //Filter by draft posts
      cy.get(filtersList).first().click()
      cy.screenshot()
      cy.get(statusList).eq(1).click()
      cy.screenshot()

      //Review draft post
      cy.get(listItemPost).first().should('contain', textTest)
      cy.screenshot()
      cy.get(listItemStatusPost).first().should('contain', 'Draft')
      cy.screenshot()
  })

  //9
  it('login, crear page, revisar lista pages, revisar publicado', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates a page and publishes it
    createPage();
    cy.screenshot()

    //Publish page
    cy.get(btnPublishPage).click()
    cy.screenshot()
    cy.get(btnModalPublishPage).click()
    cy.screenshot()
    cy.wait(1000)

    //Go back to posts list
    cy.get(btnBackPage).click()
    cy.screenshot()

    // THEN: the published page exists
    //Verify published page
    cy.get(listItemPage).first().should('contain', textTest3)
    cy.screenshot()
    cy.get(listItemStatusPage).first().should('contain', 'Published')
    cy.screenshot()
  })

  //10
  it('login, crear page en draft, revisar lista page guardado como draft', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates a page as draft
    createPage();
    cy.screenshot()

    //Go back to pages list
    cy.get(btnBackPage).click()
    cy.screenshot()

    // THEN: The page exists and has draft status
    //Verify draft post in list 
    cy.get(listItemPage).first().should('contain', textTest3)
    cy.screenshot()
    cy.get(listItemStatusPage).first().should('contain', 'Draft')
    cy.screenshot()
  })

  //11
  it('login, crear page, revisar lista page, revisar publicada, modificar page, publicada con el cambio', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates, publish and modify a page
    createPage();
    cy.screenshot()

    //Publish page
    cy.get(btnPublishPage).click()
    cy.screenshot()
    cy.get(btnModalPublishPage).click()
    cy.screenshot()
    cy.wait(1000)

    //Go back to page list
    cy.get(btnBackPage).click()
    cy.screenshot()

    //Verify published page
    cy.get(listItemPage).eq(1).should('contain', textTest3)
    cy.screenshot()
    cy.get(listItemStatusPage).eq(1).should('contain', 'Published')
    cy.screenshot()

    //Modify page
    cy.get(listItemPage).eq(1).click()
    cy.screenshot()
    cy.get(textPage).click()
    cy.screenshot()
    cy.get(textPage).first().type(textTest4)
    cy.screenshot()

    // //Update page
    cy.get(btnPublishPage).click()
    cy.screenshot()
    cy.get(btnModalPublishPage).click()
    cy.screenshot()
    cy.wait(2000)

    //Go back to pages list
    cy.get(cy.get(btnBackPage).click())
    cy.screenshot()

    // THEN: The page exists
    //Review published page
    cy.get(listItemPage).eq(1).should('contain', textTest3)
    cy.screenshot()
    cy.get(listItemStatusPage).eq(1).should('contain', 'Published')
    cy.screenshot()

    //Review changes in published page
    cy.get(listItemPage).eq(1).click()
    cy.screenshot()
    cy.get('.koenig-editor__editor.__mobiledoc-editor').should('contain', textTest4)
    cy.screenshot()
  }) 

  //12
  it('login, crear page, revisar lista page, revisar publicada, eliminar page, publicada con el cambio', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates and deletes a page
    createPage();
    cy.screenshot()

    //Publish page
    cy.get(btnPublishPage).click()
    cy.screenshot()
    cy.get(btnModalPublishPage).click()
    cy.screenshot()
    cy.wait(1000)

    //Go back to pages list
    cy.get(btnBackPage).click()
    cy.screenshot()

    //Verify published page
    cy.get(listItemPage).eq(1).should('contain', textTest3)
    cy.screenshot()
    cy.get(listItemStatusPage).eq(1).should('contain', 'Published')
    cy.screenshot()

    //Delete page
    deletePage(1)
    cy.screenshot()

    // THEN: The page doesn't exist
    //Review published post
    cy.get(listItemPage).should('have.length', 3)
    cy.screenshot()
  })  

  //13
  it('login, crear page, setear scheduele page con hora erronea, que aparezca  error', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates and schedule a page with wrong time
    createPage();
    cy.screenshot()

    // THEN: Displayed error
    //Schedule publish page
    cy.get(btnPublishPage).click()
    cy.screenshot()
    cy.get(inputScheduleTime).first().clear()
    cy.screenshot()
    cy.get(btnModalPublishPage).click()
    cy.screenshot()
    cy.get(msjError).should('contain', 'Must be in format: "15:00"')
    cy.screenshot()
  })

  //14
  it('login, crear page, setear scheduele page, verificar page en listado', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates and schedule a page correctly
    createPage();

    //Schedule publish page
    cy.get(btnPublishPage).click()
    cy.screenshot()
    cy.get(radioScheduleOption).eq(1).click()
    cy.screenshot()
    cy.get(btnModalPublishPage).click()
    cy.screenshot()

    //Go back to page list
    cy.get(btnBackPage).click()
    cy.screenshot()

    //THEN: The page is scheduled
    //Verify published page
    cy.get(listItemPage).first().should('contain', textTest3)
    cy.screenshot()
    cy.get(listItemStatusPage).first().should('contain', 'Scheduled')
    cy.screenshot()
  })  

  //15
  it('login, crear page, revisar lista page, filtrar por publicado, verificar en lista.', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user creates a page and review the published pages by filter

    //Create page  
    createPage();
    cy.screenshot()

    //Publish page
    cy.get(btnPublishPage).click()
    cy.screenshot()
    cy.get(btnModalPublishPage).click()
    cy.screenshot()
    cy.wait(1000)

    //Go back to pages list
    cy.get(btnBackPage).click()
    cy.screenshot()
    cy.wait(2000)

    //THEN: the page created is published
    //Filter by published pages
    cy.get(filtersList).first().click()
    cy.screenshot()
    cy.get(statusList).eq(2).click()
    cy.screenshot()

    //Verify published post
    cy.get(listItemPage).first().should('contain', textTest3)
    cy.screenshot()
    cy.get(listItemStatusPage).first().should('contain', 'Published')
    cy.screenshot()
  })

  //16
  it('login, crear page, revisar lista page, revisar publicado, modificar page a unpublised, filtrar por draft pages, verificar page', () => {
    
    //GIVEN: a user visited 'http://localhost:2368/ghost' and login
    //WHEN: the user creates a page, publish the page, modify it to unpublished

    //Create page  
    createPage();
    cy.screenshot()

    //Publish page
    cy.get(btnPublishPage).click()
    cy.screenshot()
    cy.get(btnModalPublishPage).click()
    cy.screenshot()
    cy.wait(1000)

    //Go back to pages list
    cy.get(btnBackPage).click()
    cy.screenshot()
    cy.wait(2000)

    //Filter by published
    cy.get(filtersList).first().click()
    cy.screenshot()
    cy.get(statusList).eq(2).click()
    cy.screenshot()

    //Verify published page
    cy.get(listItemPage).first().should('contain', textTest3)
    cy.screenshot()
    cy.get(listItemStatusPage).first().should('contain', 'Published')
    cy.screenshot()
    
    //Modify page to unpublished
    cy.get(listItemPage).first().click()
    cy.screenshot()
    cy.get('.gh-publishmenu.ember-view').click()
    cy.screenshot()
    cy.get('.gh-publishmenu-content.gh-publishmenu-section').first().click();
    cy.screenshot()
    //cy.get('.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click()
    cy.get(btnModalPublishPost).click()
    cy.screenshot()
    cy.wait(2000)

    //Go back to pages list
    cy.get(btnBackPage).click()
    cy.screenshot()
    cy.wait(2000)

    //THEN: the post has to be in draft posts
    //Filter by draft posts
    cy.get(filtersList).first().click()
    cy.screenshot()
    cy.get(statusList).eq(1).click()
    cy.screenshot()

    //Review draft post
    cy.get(listItemPage).first().should('contain', textTest3)
    cy.screenshot()
    cy.get(listItemStatusPage).first().should('contain', 'Draft')
    cy.screenshot()
})

  //17
  it('login, ir a config, navigate, intentar crear un navigate item sin nombre, verificar que genere error', () => {
    // GIVEN: a user visited 'http://localhost:2368/ghost' and login

    // WHEN: the user change navigate config in settings
    cy.get(design).first().click()
    cy.screenshot()
    //cy.get(navigation).first().click()
    //cy.screenshot()
    cy.get('.gh-blognav-add').eq(0).click()
    cy.screenshot()
    cy.get(saveButton).click()
    cy.screenshot()

    //THEN: The navigation item has to be changed
    cy.get('.response').should('contain', 'You must specify a label')
    cy.screenshot()
    logout()
    cy.screenshot()
  })

})

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
