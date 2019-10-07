Content.prototype.addContent = function(data) {
    var collection = firebase.firestore().collection('content');
    return collection.add(data);
  };

 Content.prototype.getAllContent = function(renderer) {
    var query = firebase.firestore()
        .collection('content')
        .orderBy('title', 'desc')
        .limit(50);
  
    this.getDocumentsInQuery(query, renderer);
  };

  Content.prototype.getDocumentsInQuery = function(query, renderer) {
    query.onSnapshot(function(snapshot) {
      if (!snapshot.size) return renderer.empty(); // Display "There is no content".
  
      snapshot.docChanges().forEach(function(change) {
        if (change.type === 'removed') {
          renderer.remove(change.doc);
        } else {
          renderer.display(change.doc);
        }
      });
    });
  };
Content.prototype.getFilteredContent = function(filters, renderer) {
    var query = firebase.firestore().collection('content');
  
    if (filters.category !== 'Any') {
      query = query.where('type', '==', filters.type);
    }
  
    if (filters.city !== 'Any') {
      query = query.where('city', '==', filters.city);
    }
  
    if (filters.price !== 'Any') {
      query = query.where('price', '==', filters.price.length);
    }
  
    if (filters.sort === 'Title') {
      query = query.orderBy('title', 'desc');
    } else if (filters.sort === 'Type') {
      query = query.orderBy('type', 'desc');
    }
  
    this.getDocumentsInQuery(query, renderer);
  };