class ItemsController < ApplicationController
  def index
    @items = [
      { id: 1, firstname: 'Sergey', lastname: 'Ivanov', type: 'alert' },
      { id: 2, firstname: 'Andre', lastname: 'Petrov', type: 'info', task: {} },
      { id: 3, firstname: 'Mike', lastname: 'Sidorov', type: 'error', user: {} }
    ]
  end
end
