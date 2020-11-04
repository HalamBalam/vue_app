class FindOrganizations
  attr_accessor :initial_scope

  def initialize(initial_scope)
    @initial_scope = initial_scope
  end

  def call(params)
    scoped = search(initial_scope, params[:search])
    scoped = sort(scoped, params[:sort_type], params[:sort_direction])
    scoped = paginate(scoped, params[:page], params[:rows_per_page])
    scoped
  end

  private

  def search(scoped, query)
    query ? scoped.where("name ILIKE ? OR inn ILIKE ? OR ogrn ILIKE ?", "%#{query}%", "%#{query}%", "%#{query}%") : scoped
  end

  def sort(scoped, sort_type, sort_direction)
    sort_direction ||= :asc
    sort_type ? scoped.order(sort_type => sort_direction) : scoped
  end

  def paginate(scoped, page, rows_per_page)
    rows_per_page ||= 3
    page ? scoped.paginate(page.to_i, rows_per_page.to_i) : scoped
  end
end
