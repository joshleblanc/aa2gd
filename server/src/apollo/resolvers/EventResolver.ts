import {EventEntity} from "../../models/EventEntity";
import {Query, Resolver, Args} from "type-graphql";

@Resolver(EventEntity)
class EventResolver {
    constructor(private eventService:EventService) {}

    @Query(returns => [EventEntity])
    events(@Args() { skip, take }: EventArgs) {

    }
}
